import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { DashboardController } from './dashboard.controller';
import { DashboardService } from './dashboard.service';
import { Bike, BikeSchema } from 'src/bikes/schemas/bike.schema';
import { Device, DeviceSchema } from 'src/devices/schemas/device.schema';
import { Journey, JourneySchema } from 'src/journeys/schemas/journey.schema';
import {
  Statistic,
  StatisticSchema,
} from 'src/statistics/schema/statistics.schema';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Bike.name, schema: BikeSchema }]),
    MongooseModule.forFeature([{ name: Device.name, schema: DeviceSchema }]),
    MongooseModule.forFeature([{ name: Journey.name, schema: JourneySchema }]),
    MongooseModule.forFeature([
      { name: Statistic.name, schema: StatisticSchema },
    ]),
  ],
  controllers: [DashboardController],
  providers: [DashboardService],
})
export class DashboardModule {}
