/**
 * DTO used for logging events during a journey.
 * Supports log types like 'start', 'stop', or 'ping' with timestamped tracking.
 */
import { IsMongoId, IsString, IsDateString, IsOptional } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
export class CreateLogDto {
  @IsMongoId()
  @IsOptional() // Optional: autp-filled from authenticated user
  user_id?: string;

  @ApiProperty()
  @IsMongoId()
  deviceId: string; // ID of the device that sent the log

  @ApiProperty()
  @IsMongoId()
  journey_id: string; // ID of the journey this log belongs to

  @ApiProperty()
  @IsString()
  type: 'start' | 'stop' | 'ping'; // Type of log event

  @ApiProperty()
  @IsDateString()
  timestamp: string; // ISO-formatted timestamp of the log
}
