/**
 * Extends BaseController to manage User entities.
 * Integrates CASL policies for fine-grained access control.
 * Disables creation via /users (delegated to /auth/register).
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
import {
  ApiTags,
  ApiBearerAuth,
  ApiBody,
  ApiParam,
  ApiExcludeEndpoint,
} from '@nestjs/swagger';
import { UsersService } from './users.service';
import { UpdateUserDto } from './dto/update-user.dto';
import { User, UserDocument } from './schemas/user.schema';
import { BaseController } from 'src/common/base/base.controller';
import { PoliciesGuard } from 'src/common/ability/policies.guard';
import { CheckPolicies } from 'src/common/ability/check-policies.decorator';
import { AppAbility } from 'src/common/ability/casl-ability.factory';
import { Action } from 'src/common/ability/actions.enum';
import { RequestWithUser } from 'src/common/interfaces/request-with-user.interface';

@ApiTags('Users')
@ApiBearerAuth('jwt-auth')
@Controller('users')
export class UsersController extends BaseController<
  UserDocument,
  any,
  UpdateUserDto
> {
  constructor(protected readonly usersService: UsersService) {
    super(usersService);
  }

  /**
   * Returns a list of all users (requires read permission).
   */
  @Get()
  @UseGuards(PoliciesGuard)
  @CheckPolicies((ability: AppAbility) => ability.can(Action.read, User))
  override findAll(@Req() req: RequestWithUser) {
    return super.findAll(req);
  }

  /**
   * Disabled. Use /auth/register instead.
   */
  @Post()
  @ApiExcludeEndpoint()
  override create(): never {
    throw new Error('POST /users is disabled. Use /auth/register instead.');
  }

  /**
   * Returns a specific user by ID (requires read permission).
   */
  @Get(':id')
  @UseGuards(PoliciesGuard)
  @CheckPolicies((ability: AppAbility) => ability.can(Action.read, User))
  @ApiParam({ name: 'id', required: true })
  override findOne(@Param('id') id: string, @Req() req: RequestWithUser) {
    return super.findOne(id, req);
  }

  /**
   * Updates a user by ID (requires update permission).
   */
  @Patch(':id')
  @UseGuards(PoliciesGuard)
  @CheckPolicies((ability: AppAbility) => ability.can(Action.update, User))
  @ApiParam({ name: 'id', required: true })
  @ApiBody({ type: UpdateUserDto })
  override update(
    @Param('id') id: string,
    @Body() updateUserDto: UpdateUserDto,
    @Req() req: RequestWithUser,
  ) {
    return super.update(id, updateUserDto, req);
  }

  /**
   * Deletes a user by ID (requires delete permission).
   */
  @Delete(':id')
  @UseGuards(PoliciesGuard)
  @CheckPolicies((ability: AppAbility) => ability.can(Action.delete, User))
  @ApiParam({ name: 'id', required: true })
  override remove(@Param('id') id: string, @Req() req: RequestWithUser) {
    return super.remove(id, req);
  }
}
