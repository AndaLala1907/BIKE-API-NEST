/**
 * Data Transfer Object used for creating a new bike.
 * Includes validation and Swagger decorators for each property.
 */
import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsNumber, IsMongoId, IsNotEmpty } from 'class-validator';
// DTO for creating a new bike
export class CreateBikeDto {
  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  name: string; // Name of the bike

  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  type: string; // Type/category of the bike

  @ApiProperty()
  @IsNumber()
  @IsNotEmpty()
  weight: number; // Weight of the bike in kilograms

  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  user_id: string; // ID of the user who owns the bike

  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  speedType: string; // ID or label of speed type associated with the bike

  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  roadType: string; // ID or label of road type associated with the bike

  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  barcode: string; // Unique barcode used for device pairing
}
