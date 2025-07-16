/**
 * DTO used for real-time updates during an ongoing journey.
 * Carries the journey ID, current coordinates, timestamp, and user/log reference.
 */
import { IsMongoId, IsNotEmpty, IsNumber } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
export class PingDto {
  @ApiProperty()
  @IsMongoId()
  @IsNotEmpty()
  log_id: string; // ID of the log being updated

  @ApiProperty()
  @IsMongoId()
  @IsNotEmpty()
  user_id: string; // ID of the user performing the ping

  @ApiProperty()
  @IsNumber()
  latitude: number; // Current latitude

  @ApiProperty()
  @IsNumber()
  longitude: number; // Current longitude
}
