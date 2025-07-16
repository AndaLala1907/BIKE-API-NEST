import { PartialType } from '@nestjs/mapped-types';
import { ApiPropertyOptional } from '@nestjs/swagger';
/**
 * DTO used to update existing statistics.
 * Inherits from CreateStatisticDto with all fields made optional.
 * Suitable for PATCH operations.
 */
export class UpdateStatisticDto {
  @ApiPropertyOptional()
  user_id?: string; // Optional: updated user ID

  @ApiPropertyOptional()
  distance?: number; // Optional: updated distance

  @ApiPropertyOptional()
  duration?: number; // Optional: updated duration

  @ApiPropertyOptional()
  calories?: number; // Optional: updated calories

  @ApiPropertyOptional()
  avg_speed?: number; // Optional: updated average speed
}
