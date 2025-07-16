/**
 * DTO used to update user information.
 * Inherits from CreateUserDto and makes all fields optional.
 * Suitable for PATCH requests with partial user updates.
 */
import { PartialType } from '@nestjs/swagger';
import { CreateUserDto } from './create-user.dto';

// Extends CreateUserDto with optional fields for updating
export class UpdateUserDto extends PartialType(CreateUserDto) {}
