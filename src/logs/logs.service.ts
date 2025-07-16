/**
 * Service that handles all log-related logic, including automatic
 * calorie calculation and statistic creation when a "stop" log is saved.
 */

import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Types } from 'mongoose';

import { Log, LogDocument } from './schemas/log.schema';
import { BaseService } from 'src/common/base/base.service';
import { Statistic } from 'src/statistics/schema/statistics.schema';

@Injectable()
export class LogsService extends BaseService<LogDocument> {
  constructor(
    @InjectModel(Log.name)
    private readonly logModel: Model<LogDocument>,

    @InjectModel(Statistic.name)
    private readonly statisticModel: Model<Statistic>,
  ) {
    super(logModel);
  }

  /**
   * Overrides the default create method to add:
   * 1. Calorie calculation when type = "stop"
   * 2. Automatic creation of a related Statistic document
   */
  override async create(data: Partial<LogDocument>): Promise<LogDocument> {
    const createdLog = await super.create(data);

    if (createdLog.type === 'stop' && createdLog.user_id) {
      // Find the latest 'start' log for this user
      const latestStartLog = await this.logModel
        .findOne({
          user_id: createdLog.user_id,
          type: 'start',
        })
        .sort({ timestamp: -1 });

      if (latestStartLog) {
        const startedAt = new Date(latestStartLog.timestamp);
        const stoppedAt = new Date(createdLog.timestamp);

        const durationInSeconds =
          (stoppedAt.getTime() - startedAt.getTime()) / 1000;

        // Calculate calories based on duration
        const calories = this.calculateCalories(durationInSeconds);

        // Update the current 'stop' log with duration and calories
        await this.logModel.findByIdAndUpdate(createdLog._id, {
          caloriesBurned: calories,
          startedAt,
          ended: true,
        });

        // Create a Statistic entry from this journey
        await this.statisticModel.create({
          user_id: createdLog.user_id,
          distance: 2, // hardcoded for now, can be dynamic later
          duration: durationInSeconds,
          calories: calories,
          avg_speed: 2 / (durationInSeconds / 3600), // km/h
          created_at: startedAt,
          updatedAt: stoppedAt,
        });
      }
    }

    return createdLog;
  }

  /**
   * Basic calorie formula based on time.
   * Replace this with a more advanced logic (weight, bike type, road, etc.)
   */
  private calculateCalories(durationInSeconds: number): number {
    const minutes = durationInSeconds / 60;
    const calories = minutes * 8; // Example: 8 cal/min
    return Math.round(calories);
  }
}
