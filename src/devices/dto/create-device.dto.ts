/**
 * DTO for creating a new device. Includes validation rules for each property.
 * The status defaults to 'unpaired' unless provided.
 */
import { IsEnum, IsNotEmpty, IsOptional, IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateDeviceDto {
  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  bike_id: string; // ID of the bike this device will be paired with

  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  barcode: string; // Unique barcode for identification and pairing

  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  deviceId: string; // Unique hardware ID of the physical device

  @ApiProperty()
  @IsEnum(['paired', 'unpaired'])
  @IsOptional()
  status?: 'paired' | 'unpaired'; // Optional pairing status (default:'unpaired')

  @ApiProperty()
  @IsOptional()
  pairedAt?: Date; // Optional timestamp when pairing occurred

  @ApiProperty()
  @IsOptional()
  unpairedAt?: Date; // Optional timestamp when unpairing occurred
}
