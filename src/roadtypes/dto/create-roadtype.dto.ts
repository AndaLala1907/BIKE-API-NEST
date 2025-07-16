/**
 * DTO used when creating a new road type.
 * Validates that the name field is a non-empty string.
 */
import { IsNotEmpty, IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateRoadTypeDto {
  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  name: string; // Name of the road type

  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  description: string; // Description of the road type
}
