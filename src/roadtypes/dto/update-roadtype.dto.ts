/**
 * DTO used to update an existing road type.
 * Inherits all fields from CreateRoadTypeDto but makes them optional.
 * Ideal for PATCH requests with partial updates.
 */
import { ApiProperty, ApiPropertyOptional, PartialType } from '@nestjs/swagger';
import { CreateRoadTypeDto } from './create-roadtype.dto';

// Makes all properties from CreateRoadTypeDto optional
export class UpdateRoadTypeDto extends PartialType(CreateRoadTypeDto) {
  @ApiPropertyOptional()
  name?: string; // Optional new name

  @ApiPropertyOptional()
  description?: string; // Optional new description
}
