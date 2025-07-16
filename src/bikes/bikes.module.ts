/**
 * This module handles all logic related to bikes.
 * It sets up the Mongoose schema for Bike, the controller, service,
 * and CASL-based authorization providers.
 */
import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { BikesService } from './bikes.service';
import { BikesController } from './bikes.controller';
import { Bike, BikeSchema } from './schemas/bike.schema';
import { CaslAbilityFactory } from 'src/common/ability/casl-ability.factory';
import { PoliciesGuard } from 'src/common/ability/policies.guard';

@Module({
  imports: [
    // Register the Bike schema with Mongoose for dependency injection
    MongooseModule.forFeature([{ name: Bike.name, schema: BikeSchema }]),
  ],
  // Exposes the controller that handles HTTP requests for bikes
  controllers: [BikesController],
  // Providers the service for business logic and CASL policy handlers
  providers: [BikesService, CaslAbilityFactory, PoliciesGuard],
  exports: [MongooseModule], // Export sxhema for use in other modules
})
export class BikesModule {}
