/**
 * Registers all components related to road type management.
 * Includes:
 * - Mongoose schema registration
 * - REST controller and service for road types
 * - CASL ability factory and policy guard for access control
 */
import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { RoadtypesService } from './roadtypes.service';
import { RoadTypesController } from './roadtypes.controller';
import { RoadType, RoadTypeSchema } from './schemas/roadtype.schema';
import { CaslAbilityFactory } from 'src/common/ability/casl-ability.factory';
import { PoliciesGuard } from 'src/common/ability/policies.guard';

@Module({
  // Register RoadType schema with Mongoose
  imports: [
    MongooseModule.forFeature([
      { name: RoadType.name, schema: RoadTypeSchema },
    ]),
  ],
  // REST cotroller for managing road types
  controllers: [RoadTypesController],

  // Business logic and access control providers
  providers: [RoadtypesService, CaslAbilityFactory, PoliciesGuard],

  // Allow schema exports to be used in other modules
  exports: [MongooseModule],
})
export class RoadtypesModule {}
