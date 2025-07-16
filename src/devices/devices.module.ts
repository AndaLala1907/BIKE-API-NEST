/**
 * - Mongoose schema registration
 * - Device controller and service
 * - CASL ability and policy guard for access control
 */
import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { DevicesService } from './devices.service';
import { DevicesController } from './devices.controller';
import { Device, DeviceSchema } from './schemas/device.schema';
import { CaslAbilityFactory } from 'src/common/ability/casl-ability.factory';
import { PoliciesGuard } from 'src/common/ability/policies.guard';

@Module({
  //Register the Device schema for dependency injection with Mongoose
  imports: [
    MongooseModule.forFeature([{ name: Device.name, schema: DeviceSchema }]),
  ],
  //Controller that handles HTTP endpoints for devices
  controllers: [DevicesController],
  // Service with business logic and CASL policy provider
  providers: [DevicesService, CaslAbilityFactory, PoliciesGuard],
  exports: [MongooseModule],
})
export class DevicesModule {}
