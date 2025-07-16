/**
 * This service contains business logic related to bikes.
 * It extends the BaseService to reuse common CRUD operations.
 */
import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Bike, BikeDocument } from './schemas/bike.schema';
import { BaseService } from 'src/common/base/base.service';

@Injectable()
export class BikesService extends BaseService<BikeDocument> {
  // Injects Mongoose model for Bike
  constructor(
    @InjectModel(Bike.name)
    private readonly bikeModel: Model<BikeDocument>,
  ) {
    // Pass the model to the generic BaseService for standard methods
    super(bikeModel);
  }
  /**
   * Finds a bike by its ID.
   * Returns null if not found (no error thrown).
   */
  async findOne(id: string): Promise<BikeDocument | null> {
    return this.bikeModel.findById(id);
  }
  /**
   * Soft-deletes a bike by setting deletedAt field.
   * Throws 404 if the bike doesn't exist or is already deleted.
   */
  async remove(id: string): Promise<BikeDocument> {
    const deleted = await this.bikeModel.findOneAndUpdate(
      { _id: id, deletedAt: null },
      { deletedAt: new Date() },
      { new: true },
    );

    if (!deleted) {
      throw new NotFoundException(`Bike with ID '${id}' not found`);
    }

    return deleted;
  }
}
