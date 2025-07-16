/**
 * This module registers all necessary components for journey tracking:
 * - Journey schema for Mongoose
 * - Controller and service for journeys
 * - CASL ability factory and policy guard for access control
 */
import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { JourneysService } from './journey.service';
import { JourneysController } from './journey.controller';
import { Journey, JourneySchema } from './schemas/journey.schema';
import { CaslAbilityFactory } from 'src/common/ability/casl-ability.factory';
import { PoliciesGuard } from 'src/common/ability/policies.guard';

@Module({
  // Register the Journey schema with Mongoose
  imports: [
    MongooseModule.forFeature([{ name: Journey.name, schema: JourneySchema }]),
  ],
  // Controller to handle journey-related HTTP requests
  controllers: [JourneysController],
  // Providers include the service and CASL components
  providers: [JourneysService, CaslAbilityFactory, PoliciesGuard],
  exports: [MongooseModule],
})
export class JourneysModule {}
