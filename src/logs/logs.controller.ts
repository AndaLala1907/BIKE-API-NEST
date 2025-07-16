/**
 * Controller that manages log records created by devices or users.
 * Inherits common CRUD logic from BaseController.
 * Integrates CASL policy checks for access control.
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

import { LogsService } from './logs.service';
import { CreateLogDto } from './dto/create-log.dto';
import { UpdateLogDto } from './dto/update-log.dto';
import { Log, LogDocument } from './schemas/log.schema';
import { BaseController } from 'src/common/base/base.controller';
import { PoliciesGuard } from 'src/common/ability/policies.guard';
import { CheckPolicies } from 'src/common/ability/check-policies.decorator';
import { AppAbility } from 'src/common/ability/casl-ability.factory';
import { Action } from 'src/common/ability/actions.enum';
import { RequestWithUser } from 'src/common/interfaces/request-with-user.interface';

@ApiTags('Logs')
@ApiBearerAuth('jwt-auth')
@Controller('logs')
export class LogsController extends BaseController<
  LogDocument,
  CreateLogDto,
  UpdateLogDto
> {
  constructor(protected readonly service: LogsService) {
    super(service);
  }

  /**
   * Returns all logs (requires read permission).
   */
  @Get()
  @UseGuards(PoliciesGuard)
  @CheckPolicies((ability: AppAbility) => ability.can(Action.read, Log))
  override findAll(@Req() req: RequestWithUser) {
    return super.findAll(req);
  }

  /**
   * Creates a new log. Adds user_id from the request object.
   */
  @Post()
  @UseGuards(PoliciesGuard)
  @CheckPolicies((ability: AppAbility) => ability.can(Action.create, Log))
  @ApiBody({ type: CreateLogDto })
  override create(
    @Body() createDto: CreateLogDto,
    @Req() req: RequestWithUser,
  ) {
    const enrichedDto = {
      ...createDto,
      user_id: req.user._id, // Attach current user's ID to the log
    };

    return super.create(enrichedDto, req);
  }

  /**
   * Retrieves a log by ID (requires read permission).
   */
  @Get(':id')
  @UseGuards(PoliciesGuard)
  @CheckPolicies((ability: AppAbility) => ability.can(Action.read, Log))
  @ApiParam({ name: 'id', required: true })
  override findOne(@Param('id') id: string, @Req() req: RequestWithUser) {
    return super.findOne(id, req);
  }

  /**
   * Updates a log by ID (requires update permission).
   */
  @Patch(':id')
  @UseGuards(PoliciesGuard)
  @CheckPolicies((ability: AppAbility) => ability.can(Action.update, Log))
  @ApiParam({ name: 'id', required: true })
  @ApiBody({ type: UpdateLogDto })
  override update(
    @Param('id') id: string,
    @Body() updateDto: UpdateLogDto,
    @Req() req: RequestWithUser,
  ) {
    return super.update(id, updateDto, req);
  }

  /**
   * Soft-deletes a log entry (requires delete permission).
   */
  @Delete(':id')
  @UseGuards(PoliciesGuard)
  @CheckPolicies((ability: AppAbility) => ability.can(Action.delete, Log))
  @ApiParam({ name: 'id', required: true })
  override remove(@Param('id') id: string, @Req() req: RequestWithUser) {
    return super.remove(id, req);
  }
}
