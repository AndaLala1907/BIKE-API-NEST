import { PartialType } from '@nestjs/mapped-types';
import { CreateBikeDto } from './create-bike.dto';
import { ApiPropertyOptional } from '@nestjs/swagger';

/**
 * DTO for updating an existing bike.
 * Extends CreateBikeDto but all fields are optional.
 */
export class UpdateBikeDto extends PartialType(CreateBikeDto) {
  @ApiPropertyOptional()
  model?: string;

  @ApiPropertyOptional()
  brand?: string;

  @ApiPropertyOptional()
  type?: string;

  @ApiPropertyOptional()
  image?: string;

  @ApiPropertyOptional()
  kilometers?: number;

  @ApiPropertyOptional()
  status?: string;

  @ApiPropertyOptional({ type: [String] })
  colors?: string[];

  @ApiPropertyOptional()
  name?: string;

  @ApiPropertyOptional()
  barcode?: string;

  @ApiPropertyOptional()
  owner?: string; // MongoId
}
