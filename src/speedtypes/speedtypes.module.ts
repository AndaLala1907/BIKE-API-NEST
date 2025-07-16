/**
 * This module manages speed type definitions used for journeys.
 * Registers the schema, controller, and service, and enforces access control
 * using CASL guards.
 */
import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { SpeedTypesService } from './speedtypes.service';
import { SpeedTypesController } from './speedtypes.controller';
import { SpeedType, SpeedTypeSchema } from './schemas/speedtype.schema';
import { CaslAbilityFactory } from 'src/common/ability/casl-ability.factory';
import { PoliciesGuard } from 'src/common/ability/policies.guard';

@Module({
  // Register the SpeedType schema with Mongoose
  imports: [
    MongooseModule.forFeature([
      { name: SpeedType.name, schema: SpeedTypeSchema },
    ]),
  ],
  // Controller that handles HTTP requests for speed types
  controllers: [SpeedTypesController],
  // Service and CASL providers for access control logic
  providers: [SpeedTypesService, CaslAbilityFactory, PoliciesGuard],
  exports: [MongooseModule],
})
export class SpeedtypesModule {}
