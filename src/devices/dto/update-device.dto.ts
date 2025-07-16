/**
 * DTO for updating an existing device.
 * Inherits all fields from CreateDeviceDto but makes them optional.
 * Useful for PATCH requests where partial updates are allowed.
 */
import { PartialType } from '@nestjs/mapped-types';
import { CreateDeviceDto } from './create-device.dto';
import { ApiPropertyOptional } from '@nestjs/swagger';

// Inherit all fields from CreateDeviceDto as optional for updates
export class UpdateDeviceDto extends PartialType(CreateDeviceDto) {
  @ApiPropertyOptional()
  bike_id?: string;
  @ApiPropertyOptional()
  barcode?: string;
  @ApiPropertyOptional()
  deviceId?: string;
  @ApiPropertyOptional()
  status?: 'paired' | 'unpaired' | undefined;
}
