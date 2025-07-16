/**
 * Extends BaseController to manage Device entities.
 * Applies CASL-based authorization and JWT protection.
 * Provides full CRUD operations on /devices route.
 */
import {
  Controller,
  Get,
  Post,
  Patch,
  Delete,
  Param,
  Body,
  Req,
  UseGuards,
} from '@nestjs/common';
import { ApiTags, ApiBearerAuth, ApiBody, ApiParam } from '@nestjs/swagger';

import { DevicesService } from './devices.service';
import { CreateDeviceDto } from './dto/create-device.dto';
import { UpdateDeviceDto } from './dto/update-device.dto';
import { Device, DeviceDocument } from './schemas/device.schema';
import { BaseController } from 'src/common/base/base.controller';
import { PoliciesGuard } from 'src/common/ability/policies.guard';
import { CheckPolicies } from 'src/common/ability/check-policies.decorator';
import { AppAbility } from 'src/common/ability/casl-ability.factory';
import { Action } from 'src/common/ability/actions.enum';
import { RequestWithUser } from 'src/common/interfaces/request-with-user.interface';

@ApiTags('Devices')
@ApiBearerAuth('jwt-auth')
@Controller('devices')
export class DevicesController extends BaseController<
  DeviceDocument,
  CreateDeviceDto,
  UpdateDeviceDto
> {
  constructor(protected readonly service: DevicesService) {
    super(service);
  }

  /**
   * Retrieves all devices (requires read permission).
   */
  @Get()
  @UseGuards(PoliciesGuard)
  @CheckPolicies((ability: AppAbility) => ability.can(Action.read, Device))
  override findAll(@Req() req: RequestWithUser) {
    return super.findAll(req);
  }
  /**
   * Creates a new device (requires create permission).
   */
  @Post()
  @UseGuards(PoliciesGuard)
  @CheckPolicies((ability: AppAbility) => ability.can(Action.create, Device))
  @ApiBody({ type: CreateDeviceDto })
  override create(
    @Body() createDto: CreateDeviceDto,
    @Req() req: RequestWithUser,
  ) {
    return super.create(createDto, req);
  }
  /**
   * Retrieves a specific device by ID (requires read permission).
   */
  @Get(':id')
  @UseGuards(PoliciesGuard)
  @CheckPolicies((ability: AppAbility) => ability.can(Action.read, Device))
  @ApiParam({ name: 'id', required: true })
  override findOne(@Param('id') id: string, @Req() req: RequestWithUser) {
    return super.findOne(id, req);
  }
  /**
   * Updates a device by ID (requires update permission).
   */
  @Patch(':id')
  @UseGuards(PoliciesGuard)
  @CheckPolicies((ability: AppAbility) => ability.can(Action.update, Device))
  @ApiParam({ name: 'id', required: true })
  @ApiBody({ type: UpdateDeviceDto })
  override update(
    @Param('id') id: string,
    @Body() updateDto: UpdateDeviceDto,
    @Req() req: RequestWithUser,
  ) {
    return super.update(id, updateDto, req);
  }
  /**
   * Soft-deletes a device (requires delete permission).
   */
  @Delete(':id')
  @UseGuards(PoliciesGuard)
  @CheckPolicies((ability: AppAbility) => ability.can(Action.delete, Device))
  @ApiParam({ name: 'id', required: true })
  override remove(@Param('id') id: string, @Req() req: RequestWithUser) {
    return super.remove(id, req);
  }
}
