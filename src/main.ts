/**
 * Main entry point of the application.
 * Sets up global middleware, Swagger docs, and global guards.
 */
import { NestFactory, Reflector } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { PoliciesGuard } from './common/ability/policies.guard';
import { CaslAbilityFactory } from './common/ability/casl-ability.factory';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // Enable CORS to allow frontend clients to access the API
  app.enableCors({
    origin: ['http://localhost:4200'],
  });
  // Automatically validate incoming request DTOs
  app.useGlobalPipes(new ValidationPipe());

  /**
   * Sets up Swagger UI at /api-docs for visualizing and testing the API.
   * Enables JWT Bearer authentication for protected routes.
   */
  const config = new DocumentBuilder()
    .setTitle('BikeAPI')
    .setDescription('API documentation for BikeAPI project')
    .setVersion('1.0')
    .addBearerAuth(
      {
        type: 'http',
        scheme: 'bearer',
        bearerFormat: 'JWT',
        name: 'Authorization',
        in: 'header',
      },
      'jwt-auth', // Key name referenced by @ApiBearerAuth('jwt-auth')
    )
    .build();

  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api-docs', app, document);

  /**
   * Attaches the PoliciesGuard globally to enforce access control.
   */
  const reflector = app.get(Reflector);
  const caslAbilityFactory = app.get(CaslAbilityFactory);
  app.useGlobalGuards(new PoliciesGuard(reflector, caslAbilityFactory));

  await app.listen(process.env.PORT || 3000); // Start server
}
bootstrap();
