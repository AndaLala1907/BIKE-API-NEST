/**
 * This module registers all components related to logging telemetry data.
 * It includes:
 * - Mongoose schema registration for logs
 * - Log controller and service
 * - CASL-based authorization using PoliciesGuard as a global guard
 */
import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { LogsService } from './logs.service';
import { LogsController } from './logs.controller';
import { Log, LogSchema } from './schemas/log.schema';
import { APP_GUARD } from '@nestjs/core';
import { CaslAbilityFactory } from 'src/common/ability/casl-ability.factory';
import { PoliciesGuard } from 'src/common/ability/policies.guard';
import { StatisticsModule } from 'src/statistics/statistics.module';

@Module({
  // Register the Log schema with Mongoose
  imports: [
    MongooseModule.forFeature([{ name: Log.name, schema: LogSchema }]),
    StatisticsModule,
  ],

  // REST controller for telemetry logs
  controllers: [LogsController],

  // Services and global guard for access control
  providers: [
    LogsService,
    CaslAbilityFactory,
    { provide: APP_GUARD, useClass: PoliciesGuard }, // Global CASL guard
  ],
  exports: [MongooseModule],
})
export class LogsModule {}
