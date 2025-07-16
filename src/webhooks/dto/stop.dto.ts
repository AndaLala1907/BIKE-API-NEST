/**
 * DTO used when stopping a journey.
 * Finalizes the log by recording end coordinates and end time.
 */
import { IsMongoId, IsNotEmpty, IsNumber } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
export class StopDto {
  @ApiProperty()
  @IsMongoId()
  @IsNotEmpty()
  log_id: string; // ID of the log being finalized

  @ApiProperty()
  @IsMongoId()
  @IsNotEmpty()
  user_id: string; // ID of the user stopping the journey

  @ApiProperty()
  @IsNumber()
  latitude: number; // Final latitude coordinate

  @ApiProperty()
  @IsNumber()
  longitude: number; //Final longitude coordinate
}
