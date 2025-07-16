/**
 * DTO used to update an existing speed type.
 * Extends CreateSpeedTypeDto with all fields made optional for partial updates.
 */
import { ApiPropertyOptional, PartialType } from '@nestjs/swagger';
import { CreateSpeedTypeDto } from './create-speedtype.dto';

// Converts all properties of CreateSpeedTypeDto to optional for PATCH usage
export class UpdateSpeedTypeDto extends PartialType(CreateSpeedTypeDto) {
  @ApiPropertyOptional()
  name?: string; // Optional new name

  @ApiPropertyOptional()
  description?: string; // Optional new description
}
