import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Types } from 'mongoose';
import { Log, LogDocument } from '../logs/schemas/log.schema';
import { StartDto } from './dto/start.dto';
import { PingDto } from './dto/ping.dto';
import { StopDto } from './dto/stop.dto';
import { CalorieCalculator } from '../common/helpers/calorie-calculator';

@Injectable()
export class WebhooksService {
  constructor(
    @InjectModel(Log.name) private readonly logModel: Model<LogDocument>,
  ) {}

  /**
   * Starts a journey and returns the created log document.
   * This log_id must be used for ping and stop operations.
   */
  async start(dto: StartDto) {
    const log = new this.logModel({
      user_id: dto.user_id,
      journey_id: dto.journey_id,
      deviceId: dto.deviceId,
      coordinates: [[dto.latitude, dto.longitude]],
      ended: false,
      type: 'start',
      timestamp: new Date(),
      startedAt: new Date(),
    });
    return log.save(); // Return log with _id for later use
  }

  /**
   * Adds a new coordinate to an ongoing log every ~10 minutes.
   * Optionally calculates segmental calories if enough time has passed.
   */
  async ping(dto: PingDto) {
    const log = await this.logModel.findById(dto.log_id);
    if (!log) throw new NotFoundException('Log not found');

    log.coordinates.push([dto.latitude, dto.longitude]);
    log.timestamp = new Date();
    log.type = 'ping';

    const now = new Date();
    const lastTime = log.updatedAt || log.startedAt || now;
    const durationMs = now.getTime() - lastTime.getTime();

    if (durationMs >= 10 * 60 * 1000) {
      const user = await this.logModel.db.collection('users').findOne({
        _id: new Types.ObjectId(dto.user_id),
      });

      const weight = user?.weight || 70;
      const durationHours = durationMs / (1000 * 60 * 60);

      log.caloriesBurned =
        (log.caloriesBurned || 0) +
        CalorieCalculator.calculate({
          weight,
          durationHours,
          bikeType: undefined,
          roadType: undefined,
          speedType: undefined,
        });
    }

    return log.save();
  }

  /**
   * Ends the journey and calculates total calories.
   * This must be called with the same log_id from the start.
   */
  async stop(dto: StopDto) {
    const log = await this.logModel.findById(dto.log_id);
    if (!log) throw new NotFoundException('Log not found');

    log.coordinates.push([dto.latitude, dto.longitude]);
    log.timestamp = new Date();
    log.ended = true;
    log.type = 'stop';

    const startTime = log.startedAt || log.createdAt || new Date();
    const endTime = new Date();
    const durationMs = endTime.getTime() - startTime.getTime();
    const durationHours = durationMs / (1000 * 60 * 60);

    const db = this.logModel.db;
    const journey = await db.collection('journeys').findOne({
      _id: new Types.ObjectId(log.journey_id),
    });
    const user = await db.collection('users').findOne({
      _id: new Types.ObjectId(log.user_id),
    });

    const bike = journey?.bike_id
      ? await db
          .collection('bikes')
          .findOne({ _id: new Types.ObjectId(journey.bike_id) })
      : null;

    const roadType = journey?.roadType
      ? await db
          .collection('roadtypes')
          .findOne({ _id: new Types.ObjectId(journey.roadType) })
      : null;

    const speedType = journey?.speedType
      ? await db
          .collection('speedtypes')
          .findOne({ _id: new Types.ObjectId(journey.speedType) })
      : null;

    const weight = user?.weight || 70;

    log.caloriesBurned = CalorieCalculator.calculate({
      weight,
      durationHours,
      bikeType: bike?.type,
      roadType: roadType?.name,
      speedType: speedType?.name,
    });

    return log.save();
  }
}
