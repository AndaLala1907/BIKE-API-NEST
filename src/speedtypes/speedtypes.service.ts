/**
 * Service responsible for business logic related to speed types.
 * Inherits reusable CRUD logic from BaseService.
 */
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { SpeedType, SpeedTypeDocument } from './schemas/speedtype.schema';
import { BaseService } from 'src/common/base/base.service';

@Injectable()
export class SpeedTypesService extends BaseService<SpeedTypeDocument> {
  constructor(
    @InjectModel(SpeedType.name)
    private readonly speedTypeModel: Model<SpeedTypeDocument>, // Mongoose model for speed types
  ) {
    // Pass the model to the base service to reuse generic logic
    super(speedTypeModel);
  }
}
