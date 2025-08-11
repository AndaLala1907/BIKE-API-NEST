import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Statistic, StatisticDocument } from './schema/statistics.schema';
import { BaseService } from 'src/common/base/base.service';
import { haversineDistance } from 'src/common/helpers/haversine';
import { RequestWithUser } from 'src/common/interfaces/request-with-user.interface'; // FIXED

@Injectable()
export class StatisticsService extends BaseService<StatisticDocument> {
  constructor(
    @InjectModel(Statistic.name)
    private readonly statisticModel: Model<StatisticDocument>,
  ) {
    super(statisticModel);
  }

  /**
   * Calculates aggregated statistics for a given user based on completed logs.
   */
  async getUserStatistics(userId: string): Promise<any> {
    const logs = await this.statisticModel.db
      .collection('logs')
      .find({
        user_id: userId,
        ended: true,
      })
      .toArray();

    if (!logs || logs.length === 0) {
      return {
        user_id: userId,
        distance: 0,
        duration: 0,
        calories: 0,
        avg_speed: 0,
        deletedAt: null,
      };
    }

    const totalCalories = logs.reduce(
      (sum, log) => sum + (log.caloriesBurned || 0),
      0,
    );

    const totalDuration = logs.reduce((sum, log) => {
      const start = log.startedAt ? new Date(log.startedAt).getTime() : null;
      const end = log.timestamp
        ? new Date(log.timestamp).getTime()
        : log.updatedAt
          ? new Date(log.updatedAt).getTime()
          : null;

      const dur = start && end ? (end - start) / 1000 : 0;
      return sum + dur;
    }, 0);

    let totalDistance = 0;
    for (const log of logs) {
      const coords: number[][] = log.coordinates || [];

      for (let i = 1; i < coords.length; i++) {
        const [lat1, lon1] = coords[i - 1];
        const [lat2, lon2] = coords[i];
        totalDistance += haversineDistance(lat1, lon1, lat2, lon2);
      }
    }

    const avgSpeed =
      totalDuration > 0 ? totalDistance / (totalDuration / 3600) : 0;

    return {
      user_id: userId,
      distance: totalDistance,
      duration: totalDuration,
      calories: totalCalories,
      avg_speed: parseFloat(avgSpeed.toFixed(1)),
      created_at: logs[0]?.createdAt,
      updatedAt: logs[logs.length - 1]?.updatedAt,
      deletedAt: logs[logs.length - 1]?.deletedAt || null,
    };
  }

  /**
   * Returns filtered statistics based on user role.
   */
  async getAllWithPolicies(req: RequestWithUser): Promise<StatisticDocument[]> {
    if (req.user.role === 'admin') {
      return this.statisticModel.find().exec();
    }

    return this.statisticModel.find({ user_id: req.user._id }).exec();
  }
}
