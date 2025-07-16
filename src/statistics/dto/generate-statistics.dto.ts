import { ApiProperty } from '@nestjs/swagger';
import { IsMongoId } from 'class-validator';
/**
 * DTO used to trigger a recalculation or generation of
 * statistics from journeys for a specific user.
 */
export class GenerateStatisticsDto {
  @ApiProperty({ description: 'User ID to generate statistics for' })
  @IsMongoId()
  user_id: string; // User whose journeys will be analyzed
}
