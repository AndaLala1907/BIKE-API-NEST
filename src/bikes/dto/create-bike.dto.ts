/**
 * DTO for creating a new bike.
 * Ensures input validation and documentation for Swagger.
 */
import { ApiProperty } from '@nestjs/swagger';
import {
  IsString,
  IsNumber,
  IsMongoId,
  IsOptional,
  IsArray,
  IsNotEmpty,
} from 'class-validator';
import { Type } from 'class-transformer';

export class CreateBikeDto {
  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  model: string; // Bike model

  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  brand: string; // Bike brand

  @ApiProperty()
  @IsString()
  @IsOptional()
  type?: string; // Bike type (optional)

  @ApiProperty()
  @IsString()
  @IsOptional()
  image?: string; // Image URL (optional)

  @ApiProperty()
  @IsNumber()
  @IsOptional()
  @Type(() => Number)
  kilometers?: number; // Total kilometers ridden

  @ApiProperty()
  @IsString()
  @IsOptional()
  status?: string; // Status (e.g., active, broken, sold)

  @ApiProperty({ type: [String] })
  @IsArray()
  @IsOptional()
  @IsString({ each: true })
  colors?: string[];
  // Available bike colors

  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  name: string; // Name of the bike

  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  barcode: string; // Unique barcode for device pairing
}
