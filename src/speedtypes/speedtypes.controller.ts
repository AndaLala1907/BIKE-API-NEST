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

import { SpeedTypesService } from './speedtypes.service';
import { CreateSpeedTypeDto } from './dto/create-speedtype.dto';
import { UpdateSpeedTypeDto } from './dto/update-speedtype.dto';
import { SpeedType, SpeedTypeDocument } from './schemas/speedtype.schema';
import { BaseController } from 'src/common/base/base.controller';
import { PoliciesGuard } from 'src/common/ability/policies.guard';
import { CheckPolicies } from 'src/common/ability/check-policies.decorator';
import { AppAbility } from 'src/common/ability/casl-ability.factory';
import { Action } from 'src/common/ability/actions.enum';
import { RequestWithUser } from 'src/common/interfaces/request-with-user.interface';

@ApiTags('SpeedTypes')
@ApiBearerAuth('jwt-auth')
@Controller('speedtypes')
export class SpeedTypesController extends BaseController<
  SpeedTypeDocument,
  CreateSpeedTypeDto,
  UpdateSpeedTypeDto
> {
  constructor(protected readonly service: SpeedTypesService) {
    super(service);
  }

  /**
   * List all speed types with policy check
   */
  @Get()
  @UseGuards(PoliciesGuard)
  @CheckPolicies((ability: AppAbility) => ability.can(Action.read, SpeedType))
  override findAll(@Req() req: RequestWithUser) {
    return super.findAll(req);
  }

  /**
   * Create a new speed type entry
   */
  @Post()
  @UseGuards(PoliciesGuard)
  @CheckPolicies((ability: AppAbility) => ability.can(Action.create, SpeedType))
  @ApiBody({ type: CreateSpeedTypeDto })
  override create(
    @Body() createDto: CreateSpeedTypeDto,
    @Req() req: RequestWithUser,
  ) {
    return super.create(createDto, req);
  }

  /**
   * Get a single speed type by ID
   */
  @Get(':id')
  @UseGuards(PoliciesGuard)
  @CheckPolicies((ability: AppAbility) => ability.can(Action.read, SpeedType))
  @ApiParam({ name: 'id', required: true })
  override findOne(@Param('id') id: string, @Req() req: RequestWithUser) {
    return super.findOne(id, req);
  }

  /**
   * Update an existing speed type by ID
   */
  @Patch(':id')
  @UseGuards(PoliciesGuard)
  @CheckPolicies((ability: AppAbility) => ability.can(Action.update, SpeedType))
  @ApiParam({ name: 'id', required: true })
  @ApiBody({ type: UpdateSpeedTypeDto })
  override update(
    @Param('id') id: string,
    @Body() updateDto: UpdateSpeedTypeDto,
    @Req() req: RequestWithUser,
  ) {
    return super.update(id, updateDto, req);
  }

  /**
   * Soft-delete a speed type entry
   */
  @Delete(':id')
  @UseGuards(PoliciesGuard)
  @CheckPolicies((ability: AppAbility) => ability.can(Action.delete, SpeedType))
  @ApiParam({ name: 'id', required: true })
  override remove(@Param('id') id: string, @Req() req: RequestWithUser) {
    return super.remove(id, req);
  }
}
