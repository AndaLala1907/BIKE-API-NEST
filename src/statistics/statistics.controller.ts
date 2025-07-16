/**
 * Handles HTTP routes for statistical data entities.
 * Leverages BaseController for CRUD operations.
 * Enforces authorization rules via CASL.
 */
import {
  Controller,
  UseGuards,
  Get,
  Post,
  Patch,
  Delete,
  Param,
  Body,
  Req,
} from '@nestjs/common';
import { ApiTags, ApiBearerAuth, ApiBody, ApiParam } from '@nestjs/swagger';

import { StatisticsService } from './statistics.service';
import { UpdateStatisticDto } from './dto/update-statistic.dto';
import { Statistic, StatisticDocument } from './schema/statistics.schema';
import { BaseController } from 'src/common/base/base.controller';
import { PoliciesGuard } from 'src/common/ability/policies.guard';
import { CheckPolicies } from 'src/common/ability/check-policies.decorator';
import { AppAbility } from 'src/common/ability/casl-ability.factory';
import { Action } from 'src/common/ability/actions.enum';
import { RequestWithUser } from 'src/common/interfaces/request-with-user.interface';
import { ApiExcludeEndpoint } from '@nestjs/swagger';

@ApiTags('Statistics')
@ApiBearerAuth('jwt-auth')
@Controller('statistics')
export class StatisticsController extends BaseController<
  StatisticDocument,
  UpdateStatisticDto,
  unknown // Used as CreateDto for BaseController becuase will not let POST
> {
  constructor(protected readonly service: StatisticsService) {
    super(service);
  }

  /**
   * Retrieve all statistics (with authorization)
   */
  @Get()
  @UseGuards(PoliciesGuard)
  @CheckPolicies((ability: AppAbility) => ability.can(Action.read, Statistic))
  override findAll(@Req() req: RequestWithUser) {
    return super.findAll(req);
  }

  @Post()
  @ApiExcludeEndpoint()
  override create(): never {
    throw new Error(
      'POST /statistics is disabled. This data is generated automatically.',
    );
  }

  /**
   * Retrieve a statistic by ID
   */
  @Get(':id')
  @UseGuards(PoliciesGuard)
  @CheckPolicies((ability: AppAbility) => ability.can(Action.read, Statistic))
  @ApiParam({ name: 'id', required: true })
  override findOne(@Param('id') id: string, @Req() req: RequestWithUser) {
    return super.findOne(id, req);
  }

  @Get('user/:id')
  @UseGuards(PoliciesGuard)
  @CheckPolicies((ability: AppAbility) => ability.can(Action.read, Statistic))
  getUserStatistics(@Param('id') userId: string) {
    return this.service.getUserStatistics(userId);
  }

  /**
   * Update a statistic by ID
   */
  @Patch(':id')
  @UseGuards(PoliciesGuard)
  @CheckPolicies((ability: AppAbility) => ability.can(Action.update, Statistic))
  @ApiParam({ name: 'id', required: true })
  @ApiBody({ type: UpdateStatisticDto })
  override update(
    @Param('id') id: string,
    @Body() updateDto: UpdateStatisticDto,
    @Req() req: RequestWithUser,
  ) {
    return super.update(id, updateDto, req);
  }

  /**
   * Soft delete a statistic entry
   */
  @Delete(':id')
  @UseGuards(PoliciesGuard)
  @CheckPolicies((ability: AppAbility) => ability.can(Action.delete, Statistic))
  @ApiParam({ name: 'id', required: true })
  override remove(@Param('id') id: string, @Req() req: RequestWithUser) {
    return super.remove(id, req);
  }
}
