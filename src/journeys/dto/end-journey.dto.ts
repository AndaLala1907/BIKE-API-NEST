/**
 * DTO used to end an ongoing journey by supplying the end time.
 * Typically called from the device or server-side logic when the ride finishes.
 */
import { ApiProperty } from '@nestjs/swagger';
import { IsDateString } from 'class-validator';
export class EndJourneyDto {
  @ApiProperty({
    description: 'End time of the journey',
  })
  @IsDateString()
  endTime: string; // ISO-formatted string representing when the journey ended
}
