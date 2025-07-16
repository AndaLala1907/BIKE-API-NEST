/**
 * DTO used to create a new user.
 * Ensures proper validation for all required fields, including optional weight and role.
 */
import {
  IsEmail,
  IsNotEmpty,
  IsOptional,
  IsString,
  IsNumber,
} from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
export class CreateUserDto {
  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  name: string; // Full name of the user

  @ApiProperty()
  @IsEmail()
  @IsNotEmpty()
  email: string; // Valid email address

  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  password: string; // Password (will be hashes before storage)

  @ApiProperty()
  @IsNumber()
  @IsOptional()
  weight?: number; // Optional: user's weight in kg

  @ApiProperty()
  @IsString()
  @IsOptional()
  role?: string; // Optional: role (admin or user)
}
