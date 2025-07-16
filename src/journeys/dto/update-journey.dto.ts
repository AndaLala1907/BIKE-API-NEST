/**
 * DTO used to update journey details partially.
 * Inherits all fields from CreateJourneyDto but makes them optional,
 * making it suitable for PATCH requests.
 */
import { PartialType } from '@nestjs/swagger';
import { CreateJourneyDto } from './create-journey.dto';

// Inherits all fields from CreateJourneyDto and makes them optional
export class UpdateJourneyDto extends PartialType(CreateJourneyDto) {}
