/**
 * Provides logic to generate dashboard data for authenticated users.
 * Aggregates user data, bike info, journey summaries, and paired devices.
 */
import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User, UserDocument } from '../users/schemas/user.schema';
import { Bike, BikeDocument } from '../bikes/schemas/bike.schema';
import { Journey, JourneyDocument } from '../journeys/schemas/journey.schema';
import { Device, DeviceDocument } from '../devices/schemas/device.schema';

@Injectable()
export class HomeService {
  constructor(
    @InjectModel(User.name) private userModel: Model<UserDocument>,
    @InjectModel(Bike.name) private bikeModel: Model<BikeDocument>,
    @InjectModel(Device.name) private deviceModel: Model<DeviceDocument>,
    @InjectModel(Journey.name) private journeyModel: Model<JourneyDocument>,
  ) {}

  /**
   * Builds a full dashboard view for a user based on related data.
   * Includes user info, bikes, device status, and statistics from journeys.
   */
  async getDashboardOverview(userId: string) {
    const user = await this.userModel.findById(userId);
    if (!user) throw new NotFoundException('User not found');

    const bikes = await this.bikeModel.find({ user_id: userId });
    const devices = await this.deviceModel.find({ user_id: userId });
    const journeys = await this.journeyModel.find({ user_id: userId });

    const totalCalories = journeys.reduce(
      (acc, j) => acc + (j.caloriesBurned || 0),
      0,
    );
    const totalDistance = journeys.length * 2; // Example logic: 2 km per journey
    const totalDuration = journeys.reduce((acc, j) => {
      if (!j.startTime || !j.endTime) return acc;
      const start = new Date(j.startTime).getTime();
      const end = new Date(j.endTime).getTime();
      return acc + Math.max(0, (end - start) / 60000); // Convert to minutes
    }, 0);

    const bikeTypes = bikes.map((b) => b.type);

    // Count the most used road type
    const roadTypes = journeys
      .map((j) => j.roadType_id?.toString())
      .filter(Boolean);

    const roadTypeCount: Record<string, number> = {};
    roadTypes.forEach((type) => {
      roadTypeCount[type] = (roadTypeCount[type] || 0) + 1;
    });

    const mostUsedRoadType = Object.entries(roadTypeCount).reduce(
      (a: [string, number], b: [string, number]) => (a[1] > b[1] ? a : b),
      ['', 0],
    )[0];

    const deviceDetail =
      devices.length > 0
        ? {
            deviceId: devices[0].deviceId,
            status: devices.length > 0 ? 'Paired' : 'Unpaired',
          }
        : null;

    return {
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
      },
      bikes: bikes.map((b) => ({
        id: b._id,
        name: b.name,
        type: b.type,
        barcode: b.barcode,
      })),
      device: deviceDetail,
      statistics: {
        totalCalories,
        totalDistance,
        totalDuration,
        bikeTypes,
        mostUsedRoadType,
      },
    };
  }
}
