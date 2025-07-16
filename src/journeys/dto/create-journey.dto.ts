/**
 * DTO used when starting a new journey.
 * Contains identifiers for user, bike, device, and optional metadata for the ride.
 * Allows partial data since some fields may be filled automatically by the system.
 */
import {
  IsDateString,
  IsMongoId,
  IsOptional,
  IsString,
  IsNumber,
} from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
export class CreateJourneyDto {
  @ApiProperty()
  @IsMongoId()
  user_id: string; // ID of the user who starts the journey

  @ApiProperty()
  @IsMongoId()
  device_id: string; // ID of the paired device used

  @ApiProperty()
  @IsMongoId()
  bike_id: string; // ID of the bike used

  @ApiProperty()
  @IsOptional()
  @IsString()
  device_barcode?: string; // Optional: barcode of the device

  @ApiProperty()
  @IsOptional()
  @IsString()
  bike_barcode?: string; // Optional: barcode of the bike

  @ApiProperty()
  @IsOptional()
  @IsString()
  bike_type?: string; // Optional: type of the bike

  @ApiProperty()
  @IsOptional()
  @IsNumber()
  bike_weight?: number; // Optional: weight of the bike

  @ApiProperty()
  @IsOptional()
  @IsMongoId()
  speedType_id?: string; // Optional: speed type reference

  @ApiProperty()
  @IsOptional()
  @IsMongoId()
  roadType_id?: string; // Optional: road type reference

  @ApiProperty()
  @IsOptional()
  @IsDateString()
  startTime?: Date; // Optional: start time of the journey

  @ApiProperty()
  @IsOptional()
  @IsDateString()
  endTime?: Date; // Optional: end time of the journey
}
