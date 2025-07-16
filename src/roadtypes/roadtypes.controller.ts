/**
 * Handles HTTP routes for road type entities.
 * Inherits common CRUD behavior from BaseController.
 * Integrates CASL policies for access control.
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

import { RoadtypesService } from './roadtypes.service';
import { CreateRoadTypeDto } from './dto/create-roadtype.dto';
import { UpdateRoadTypeDto } from './dto/update-roadtype.dto';
import { RoadType, RoadTypeDocument } from './schemas/roadtype.schema';
import { BaseController } from 'src/common/base/base.controller';
import { PoliciesGuard } from 'src/common/ability/policies.guard';
import { CheckPolicies } from 'src/common/ability/check-policies.decorator';
import { AppAbility } from 'src/common/ability/casl-ability.factory';
import { Action } from 'src/common/ability/actions.enum';
import { RequestWithUser } from 'src/common/interfaces/request-with-user.interface';

@ApiTags('RoadTypes')
@ApiBearerAuth('jwt-auth')
@Controller('roadtypes')
export class RoadTypesController extends BaseController<
  RoadTypeDocument,
  CreateRoadTypeDto,
  UpdateRoadTypeDto
> {
  constructor(protected readonly service: RoadtypesService) {
    super(service);
  }

  /**
   * Fetch all road types with policy guard
   */
  @Get()
  @UseGuards(PoliciesGuard)
  @CheckPolicies((ability: AppAbility) => ability.can(Action.read, RoadType))
  override findAll(@Req() req: RequestWithUser) {
    return super.findAll(req);
  }

  /**
   * Create a new road type entry
   */
  @Post()
  @UseGuards(PoliciesGuard)
  @CheckPolicies((ability: AppAbility) => ability.can(Action.create, RoadType))
  @ApiBody({ type: CreateRoadTypeDto })
  override create(
    @Body() createDto: CreateRoadTypeDto,
    @Req() req: RequestWithUser,
  ) {
    return super.create(createDto, req);
  }

  /**
   * Retrieve a specific road type by ID
   */
  @Get(':id')
  @UseGuards(PoliciesGuard)
  @CheckPolicies((ability: AppAbility) => ability.can(Action.read, RoadType))
  @ApiParam({ name: 'id', required: true })
  override findOne(@Param('id') id: string, @Req() req: RequestWithUser) {
    return super.findOne(id, req);
  }

  /**
   * Update a specific road type
   */
  @Patch(':id')
  @UseGuards(PoliciesGuard)
  @CheckPolicies((ability: AppAbility) => ability.can(Action.update, RoadType))
  @ApiParam({ name: 'id', required: true })
  @ApiBody({ type: UpdateRoadTypeDto })
  override update(
    @Param('id') id: string,
    @Body() updateDto: UpdateRoadTypeDto,
    @Req() req: RequestWithUser,
  ) {
    return super.update(id, updateDto, req);
  }

  /**
   * Soft-delete a road type
   */
  @Delete(':id')
  @UseGuards(PoliciesGuard)
  @CheckPolicies((ability: AppAbility) => ability.can(Action.delete, RoadType))
  @ApiParam({ name: 'id', required: true })
  override remove(@Param('id') id: string, @Req() req: RequestWithUser) {
    return super.remove(id, req);
  }
}
