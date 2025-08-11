/**
 * Extends BaseController to manage Bike entities.
 * Secured with CASL policies and JWT.
 * Provides full CRUD endpoints with authorization checks.
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
  Query,
} from '@nestjs/common';
import {
  ApiTags,
  ApiBearerAuth,
  ApiBody,
  ApiParam,
  ApiOkResponse,
  ApiQuery,
} from '@nestjs/swagger';

import { BikesService } from './bikes.service';
import { CreateBikeDto } from './dto/create-bike.dto';
import { UpdateBikeDto } from './dto/update-bike.dto';
import { Bike, BikeDocument } from './schemas/bike.schema';
import { BaseController } from 'src/common/base/base.controller';
import { PoliciesGuard } from 'src/common/ability/policies.guard';
import { CheckPolicies } from 'src/common/ability/check-policies.decorator';
import { AppAbility } from 'src/common/ability/casl-ability.factory';
import { Action } from 'src/common/ability/actions.enum';
import { RequestWithUser } from 'src/common/interfaces/request-with-user.interface';
import { Public } from 'src/common/decorators/public.decorator';

@ApiTags('Bikes')
@ApiBearerAuth('jwt-auth')
@Controller('bikes')
export class BikesController extends BaseController<
  BikeDocument,
  CreateBikeDto,
  UpdateBikeDto
> {
  constructor(protected readonly bikesService: BikesService) {
    super(bikesService);
  }

  /**
   * Lists all bikes (requires read permission).
   */
  @Get()
  @UseGuards(PoliciesGuard)
  @CheckPolicies((ability: AppAbility) => ability.can(Action.read, Bike))
  override findAll(@Req() req: RequestWithUser) {
    return super.findAll(req);
  }

  @Get('shared')
  @Public()
  @ApiOkResponse({ description: 'Public shared bikes for homepage' })
  @ApiQuery({
    name: 'scope',
    required: false,
    enum: ['global', 'local'],
    schema: { default: 'global' },
  })
  findSharedPublic(@Query('scope') scope: 'global' | 'local' = 'global') {
    return this.bikesService.findSharedPublic(scope);
  }

  /**
   * Creates a new bike (requires create permission).
   */
  @Post()
  @UseGuards(PoliciesGuard)
  @CheckPolicies((ability: AppAbility) => ability.can(Action.create, Bike))
  @ApiBody({ type: CreateBikeDto })
  override create(
    @Body() createDto: CreateBikeDto,
    @Req() req: RequestWithUser,
  ) {
    return super.create(createDto, req);
  }

  /**
   * Retrieves a bike by ID (requires read permission).
   */
  @Get(':id')
  @UseGuards(PoliciesGuard)
  @CheckPolicies((ability: AppAbility) => ability.can(Action.read, Bike))
  @ApiParam({ name: 'id', required: true })
  override findOne(@Param('id') id: string, @Req() req: RequestWithUser) {
    return super.findOne(id, req);
  }

  /**
   * Updates a bike by ID (requires update permission).
   */
  @Patch(':id')
  @UseGuards(PoliciesGuard)
  @CheckPolicies((ability: AppAbility) => ability.can(Action.update, Bike))
  @ApiParam({ name: 'id', required: true })
  @ApiBody({ type: UpdateBikeDto })
  override update(
    @Param('id') id: string,
    @Body() updateDto: UpdateBikeDto,
    @Req() req: RequestWithUser,
  ) {
    return super.update(id, updateDto, req);
  }

  /**
   * Soft-deletes a bike by ID (requires delete permission).
   */
  @Delete(':id')
  @UseGuards(PoliciesGuard)
  @CheckPolicies((ability: AppAbility) => ability.can(Action.delete, Bike))
  @ApiParam({ name: 'id', required: true })
  override remove(@Param('id') id: string, @Req() req: RequestWithUser) {
    return super.remove(id, req);
  }
}
