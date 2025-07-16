/**
 * Registers all dependencies for managing statistical data:
 * - Mongoose schema
 * - REST controller and service
 * - CASL access control
 */
import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { StatisticsService } from './statistics.service';
import { StatisticsController } from './statistics.controller';
import { Statistic, StatisticSchema } from './schema/statistics.schema';
import { CaslAbilityFactory } from 'src/common/ability/casl-ability.factory';
import { PoliciesGuard } from 'src/common/ability/policies.guard';

@Module({
  // Register the Mongoose schema
  imports: [
    MongooseModule.forFeature([
      { name: Statistic.name, schema: StatisticSchema },
    ]),
  ],
  // Controller for HTTP routes
  controllers: [StatisticsController],
  // Business logic and CASL providers
  providers: [StatisticsService, CaslAbilityFactory, PoliciesGuard],
  // Allow schema usage in other modules
  exports: [MongooseModule],
})
export class StatisticsModule {}
