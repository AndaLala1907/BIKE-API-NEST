/**
 * This service provides business logic related to user journeys.
 * It extends BaseService to leverage shared CRUD operations.
 */
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Journey, JourneyDocument } from './schemas/journey.schema';
import { BaseService } from 'src/common/base/base.service';

@Injectable()
export class JourneysService extends BaseService<JourneyDocument> {
  constructor(
    @InjectModel(Journey.name)
    private readonly journeyModel: Model<JourneyDocument>, // Mongoose model for Journey
  ) {
    // Initialize BaseService with the journey model
    super(journeyModel);
  }
  async findByUser(userId: string): Promise<JourneyDocument[]> {
    return this.model
      .find({ user_id: userId })
      .sort({ createdAt: -1 })
      .limit(1);
  }
}
