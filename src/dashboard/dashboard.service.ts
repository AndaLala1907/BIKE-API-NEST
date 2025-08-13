import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Bike, BikeDocument } from 'src/bikes/schemas/bike.schema';
import { Device, DeviceDocument } from 'src/devices/schemas/device.schema';
import { Journey, JourneyDocument } from 'src/journeys/schemas/journey.schema';
import {
  Statistic,
  StatisticDocument,
} from 'src/statistics/schema/statistics.schema';

@Injectable()
export class DashboardService {
  constructor(
    @InjectModel(Bike.name) private readonly bikeModel: Model<BikeDocument>,
    @InjectModel(Device.name)
    private readonly deviceModel: Model<DeviceDocument>,
    @InjectModel(Journey.name)
    private readonly journeyModel: Model<JourneyDocument>,
    @InjectModel(Statistic.name)
    private readonly statisticModel: Model<StatisticDocument>,
  ) {}

  async getDashboardData(userId: string) {
    const [bikes, devices, journeys, statistics] = await Promise.all([
      this.bikeModel.find({ user: userId }),
      this.deviceModel.find({ user: userId }),
      this.journeyModel.find({ user: userId }),
      this.statisticModel.findOne({ user: userId }),
    ]);

    const mode =
      journeys.length === 0 && bikes.length === 0 && devices.length === 0
        ? 'new'
        : 'existing';

    return {
      mode,
      user: { id: userId },
      data: {
        bikes,
        devices,
        journeys,
        statistics,
      },
    };
  }
}
