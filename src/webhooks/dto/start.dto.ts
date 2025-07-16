/**
 * DTO used when a journey is started.
 * Contains user and journey references along with initial coordinates.
 */
import { IsMongoId, IsNotEmpty, IsNumber } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
export class StartDto {
  @ApiProperty()
  @IsMongoId()
  @IsNotEmpty()
  user_id: string; // ID of the user starting the journey

  @ApiProperty()
  @IsMongoId()
  @IsNotEmpty()
  journey_id: string; // ID of the journey being started

  @ApiProperty()
  @IsMongoId()
  @IsNotEmpty()
  deviceId: string;

  @ApiProperty()
  @IsNumber()
  latitude: number; // Latitude of initial coordinate

  @ApiProperty()
  @IsNumber()
  longitude: number; // Longitude of initial coordinate
}
