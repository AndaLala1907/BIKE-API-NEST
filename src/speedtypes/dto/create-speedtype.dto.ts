/**
 * DTO used when creating a new speed type.
 * Requires a name and optionally accepts a description.
 */
import { IsNotEmpty, IsOptional, IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateSpeedTypeDto {
  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  name: string; // Required: Name of the speed type

  @ApiProperty()
  @IsOptional()
  @IsString()
  description?: string; // Optional: Description of the speed type
}
