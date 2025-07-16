/**
 * DTO used to validate and document user registration data.
 * Ensures valid types and enforces minimum length/format constraints.
 */
import { ApiProperty } from '@nestjs/swagger';
import {
  IsString,
  IsEmail,
  MinLength,
  IsNumber,
  IsNotEmpty,
} from 'class-validator';

export class RegisterDto {
  @ApiProperty() // Shown in Swagger UI
  @IsString()
  @MinLength(2)
  name: string; // Full name (min 2 characters)

  @ApiProperty()
  @IsEmail()
  email: string; // Valid email address

  @ApiProperty()
  @IsString()
  @MinLength(8)
  password: string; // Password with at least 8 characters

  @ApiProperty()
  @IsNumber()
  weight: number; // User's weight (number)

  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  role: string; // User role (e.g., 'user', 'admin')
}
