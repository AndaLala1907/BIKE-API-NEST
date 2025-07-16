/**
 * Handles the business logic related to devices.
 * It extends the generic BaseService to inherit common CRUD operations.
 */
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Device, DeviceDocument } from './schemas/device.schema';
import { BaseService } from 'src/common/base/base.service';

@Injectable()
export class DevicesService extends BaseService<DeviceDocument> {
  constructor(
    @InjectModel(Device.name)
    private readonly deviceModel: Model<DeviceDocument>, // Mongoose model for Device
  ) {
    // Pass model to BaseService for reuse of generic operations
    super(deviceModel);
  }
}
