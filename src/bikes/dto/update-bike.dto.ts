import { PartialType } from '@nestjs/mapped-types';
import { CreateBikeDto } from './create-bike.dto';
import { ApiPropertyOptional } from '@nestjs/swagger';

/**
 * Same fields as CreateBikeDto, but all optional for PATCH requests.
 * Enables partial updates of bike entities.
 */
export class UpdateBikeDto extends PartialType(CreateBikeDto) {
  @ApiPropertyOptional()
  name?: string;

  @ApiPropertyOptional()
  type?: string;

  @ApiPropertyOptional()
  weight?: number;

  @ApiPropertyOptional()
  user_id?: string;

  @ApiPropertyOptional()
  speedType?: string;

  @ApiPropertyOptional()
  roadType?: string;

  @ApiPropertyOptional()
  barcode?: string;
}
