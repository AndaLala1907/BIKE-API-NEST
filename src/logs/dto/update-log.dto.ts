/**
 * DTO used to update an existing log entry.
 * Inherits all fields from CreateLogDto, but makes them optional.
 * Suitable for PATCH operations where only some fields are updated.
 */
import { PartialType } from '@nestjs/mapped-types';
import { CreateLogDto } from './create-log.dto';
import { ApiPropertyOptional } from '@nestjs/swagger';

// Inherit all fields from CreateLogDto as optional
export class UpdateLogDto extends PartialType(CreateLogDto) {
  @ApiPropertyOptional()
  deviceId?: string;
  @ApiPropertyOptional()
  journey_id?: string;
  @ApiPropertyOptional()
  type?: 'start' | 'stop' | 'ping' | undefined;
  @ApiPropertyOptional()
  timestamp?: string;
}
