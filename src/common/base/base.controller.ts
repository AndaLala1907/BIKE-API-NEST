/**
 * Generic controller that provides common CRUD endpoints.
 * Each method applies CASL policies and can be extended/overridden by child controllers.
 * Works with any entity type T, and optional CreateDto / UpdateDto types.
 */
import {
  Get,
  Post,
  Patch,
  Delete,
  Param,
  Body,
  Req,
  UseGuards,
} from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiBearerAuth } from '@nestjs/swagger';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';
import { PoliciesGuard } from 'src/common/ability/policies.guard';
import { CheckPolicies } from 'src/common/ability/check-policies.decorator';
import { Action } from '../ability/actions.enum';
import { RequestWithUser } from '../interfaces/request-with-user.interface';

@ApiBearerAuth('bearer')
@UseGuards(JwtAuthGuard, PoliciesGuard)
export abstract class BaseController<T, CreateDto = any, UpdateDto = any> {
  constructor(protected readonly service: any) {}

  /**
   * Create a new entity
   */
  @Post()
  @CheckPolicies((ability) => ability.can(Action.create, Object))
  @ApiOperation({ summary: 'Create a new entity' })
  @ApiResponse({ status: 201, description: 'Successfully created' })
  async create(
    @Body() data: CreateDto,
    @Req() req: RequestWithUser,
  ): Promise<T> {
    return this.service.create(data, req);
  }

  /**
   * Get all entities
   */
  @Get()
  @CheckPolicies((ability) => ability.can(Action.read, Object))
  @ApiOperation({ summary: 'Get all entities' })
  @ApiResponse({ status: 200, description: 'Successfully retrieved all' })
  async findAll(@Req() req: RequestWithUser): Promise<T[]> {
    return this.service.findAll(req);
  }

  /**
   * Get a single entity by ID
   */
  @Get(':id')
  @CheckPolicies((ability) => ability.can(Action.read, Object))
  @ApiOperation({ summary: 'Get an entity by ID' })
  @ApiResponse({ status: 200, description: 'Successfully retrieved' })
  async findOne(
    @Param('id') id: string,
    @Req() req: RequestWithUser,
  ): Promise<T> {
    return this.service.findById(id, req);
  }

  /**
   * Update an entity by ID
   */
  @Patch(':id')
  @CheckPolicies((ability) => ability.can(Action.update, Object))
  @ApiOperation({ summary: 'Update an entity by ID' })
  @ApiResponse({ status: 200, description: 'Successfully updated' })
  async update(
    @Param('id') id: string,
    @Body() data: UpdateDto,
    @Req() req: RequestWithUser,
  ): Promise<T> {
    return this.service.update(id, data, req);
  }

  /**
   * Delete an entity by ID
   */
  @Delete(':id')
  @CheckPolicies((ability) => ability.can(Action.delete, Object))
  @ApiOperation({ summary: 'Delete an entity by ID' })
  @ApiResponse({ status: 200, description: 'Successfully deleted' })
  async remove(
    @Param('id') id: string,
    @Req() req: RequestWithUser,
  ): Promise<T> {
    return this.service.remove(id, req);
  }
}
