/**
 * Handles HTTP routes related to journey entities.
 * Extends BaseController to inherit CRUD methods and adds CASL policy checks.
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

import { JourneysService } from './journey.service';
import { CreateJourneyDto } from './dto/create-journey.dto';
import { UpdateJourneyDto } from './dto/update-journey.dto';
import { Journey, JourneyDocument } from './schemas/journey.schema';
import { BaseController } from 'src/common/base/base.controller';
import { PoliciesGuard } from 'src/common/ability/policies.guard';
import { CheckPolicies } from 'src/common/ability/check-policies.decorator';
import { AppAbility } from 'src/common/ability/casl-ability.factory';
import { Action } from 'src/common/ability/actions.enum';
import { RequestWithUser } from 'src/common/interfaces/request-with-user.interface';

@ApiTags('Journeys')
@ApiBearerAuth('jwt-auth')
@Controller('journeys')
export class JourneysController extends BaseController<
  JourneyDocument,
  CreateJourneyDto,
  UpdateJourneyDto
> {
  constructor(protected readonly service: JourneysService) {
    super(service);
  }
  /**
   * Returns all journeys (with CASL read permission).
   */
  @Get('me')
  @UseGuards(PoliciesGuard)
  @CheckPolicies((ability: AppAbility) => ability.can(Action.read, Journey))
  getOwnJourneys(@Req() req: RequestWithUser) {
    return this.service.findByUser(req.user._id);
  }

  /**
   * Creates a new journey (requires create permission).
   */
  @Post()
  @UseGuards(PoliciesGuard)
  @CheckPolicies((ability: AppAbility) => ability.can(Action.create, Journey))
  @ApiBody({ type: CreateJourneyDto })
  override create(
    @Body() createDto: CreateJourneyDto,
    @Req() req: RequestWithUser,
  ) {
    return super.create(createDto, req);
  }
  /**
   * Fetches a journey by ID (requires read permission).
   */
  @Get(':id')
  @UseGuards(PoliciesGuard)
  @CheckPolicies((ability: AppAbility) => ability.can(Action.read, Journey))
  @ApiParam({ name: 'id', required: true })
  override findOne(@Param('id') id: string, @Req() req: RequestWithUser) {
    return super.findOne(id, req);
  }
  /**
   * Updates a journey by ID (requires update permission).
   */
  @Patch(':id')
  @UseGuards(PoliciesGuard)
  @CheckPolicies((ability: AppAbility) => ability.can(Action.update, Journey))
  @ApiParam({ name: 'id', required: true })
  @ApiBody({ type: UpdateJourneyDto })
  override update(
    @Param('id') id: string,
    @Body() updateDto: UpdateJourneyDto,
    @Req() req: RequestWithUser,
  ) {
    return super.update(id, updateDto, req);
  }
  /**
   * Soft-deletes a journey by ID (requires delete permission).
   */
  @Delete(':id')
  @UseGuards(PoliciesGuard)
  @CheckPolicies((ability: AppAbility) => ability.can(Action.delete, Journey))
  @ApiParam({ name: 'id', required: true })
  override remove(@Param('id') id: string, @Req() req: RequestWithUser) {
    return super.remove(id, req);
  }
}
