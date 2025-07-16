/**
 * Service responsible for business logic related to road types.
 * Inherits generic CRUD operations from BaseService.
 */
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { RoadType, RoadTypeDocument } from './schemas/roadtype.schema';
import { BaseService } from 'src/common/base/base.service';

@Injectable()
export class RoadtypesService extends BaseService<RoadTypeDocument> {
  constructor(
    @InjectModel(RoadType.name)
    private readonly roadTypeModel: Model<RoadTypeDocument>, // Inject Mongoose model for road types
  ) {
    // Pass model to BaseService to inherit generic methods
    super(roadTypeModel);
  }
}
