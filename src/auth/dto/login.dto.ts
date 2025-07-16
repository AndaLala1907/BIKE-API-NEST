/**
 * DTO used to validate user login credentials.
 * Ensures email is valid and password is not empty with a minimum length.
 */
import { IsEmail, IsNotEmpty, MinLength } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class LoginDto {
  @ApiProperty()
  @IsEmail()
  email: string; // User's email (must be valid)

  @ApiProperty()
  @IsNotEmpty()
  @MinLength(6)
  password: string; // Password (min 6 characters)
}
