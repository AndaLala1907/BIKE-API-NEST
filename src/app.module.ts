/**
 * Root module that bootstraps the application.
 * Imports all feature modules and applies global configuration.
 */
import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';

import { APP_GUARD } from '@nestjs/core';
import { JwtAuthGuard } from './auth/guards/jwt-auth.guard';

import { CaslAbilityFactory } from './common/ability/casl-ability.factory';

// Feature modules
import { UsersModule } from './users/users.module';
import { AuthModule } from './auth/auth.module';
import { BikesModule } from './bikes/bikes.module';
import { DevicesModule } from './devices/devices.module';
import { JourneysModule } from './journeys/journey.module';
import { LogsModule } from './logs/logs.module';
import { WebhooksModule } from './webhooks/webhooks.module';
import { RoadtypesModule } from './roadtypes/roadtypes.module';
import { SpeedtypesModule } from './speedtypes/speedtypes.module';
import { StatisticsModule } from './statistics/statistics.module';
import { HomeModule } from './home/home.module';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { PoliciesGuard } from './common/ability/policies.guard';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }), // Loads .env variables
    MongooseModule.forRoot(process.env.MONGO_URI as string), // MongoDB connection

    // Register all modules
    AuthModule,
    UsersModule,
    BikesModule,
    DevicesModule,
    JourneysModule,
    LogsModule,
    WebhooksModule,
    RoadtypesModule,
    SpeedtypesModule,
    StatisticsModule,
    HomeModule,
  ],
  controllers: [AppController],
  providers: [
    AppService,
    CaslAbilityFactory,
    { provide: APP_GUARD, useClass: JwtAuthGuard },
    { provide: APP_GUARD, useClass: PoliciesGuard },
    {
      provide: APP_GUARD,
      useClass: JwtAuthGuard, //Apply JwtAuthGuard globally
    },
  ],
})
export class AppModule {}
