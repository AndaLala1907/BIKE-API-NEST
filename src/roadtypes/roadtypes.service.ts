/**
 * Service for Road Types.
 * Extends BaseService and exposes a policy-aware getter used by BaseController.
 */
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

import { RoadType, RoadTypeDocument } from './schemas/roadtype.schema';
import { BaseService } from 'src/common/base/base.service';
import { RequestWithUser } from 'src/common/interfaces/request-with-user.interface';

@Injectable()
export class RoadtypesService extends BaseService<RoadTypeDocument> {
  constructor(
    @InjectModel(RoadType.name)
    private readonly roadTypeModel: Model<RoadTypeDocument>,
  ) {
    super(roadTypeModel);
  }

  /**
   * Used nga BaseController.findAll(req) nëse ekziston.
   * Road types janë “public-like” për të gjithë userat.
   */
  async getAllWithPolicies(_req: RequestWithUser): Promise<RoadTypeDocument[]> {
    return this.roadTypeModel.find().sort({ createdAt: -1 }).exec();
  }
}
