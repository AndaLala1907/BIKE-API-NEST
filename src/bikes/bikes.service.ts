import {
  Injectable,
  ForbiddenException,
  NotFoundException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Types } from 'mongoose';
import { Bike, BikeDocument } from './schemas/bike.schema';
import { CreateBikeDto } from './dto/create-bike.dto';
import { UpdateBikeDto } from './dto/update-bike.dto';
import { RequestWithUser } from '../common/interfaces/request-with-user.interface';

@Injectable()
export class BikesService {
  constructor(
    @InjectModel(Bike.name) private readonly bikeModel: Model<BikeDocument>,
  ) {}

  /**
   * Create a new bike linked to the authenticated user
   */
  async create(dto: CreateBikeDto, userId: string): Promise<Bike> {
    const newBike = new this.bikeModel({
      ...dto,
      owner: new Types.ObjectId(userId),
    });
    return newBike.save();
  }

  /**
   * Get all bikes
   * - Guest → only bikes with isPublic: true
   * - User → only bikes owned by that user
   * - Admin → all bikes
   */
  async findAll(user?: RequestWithUser['user']): Promise<Bike[]> {
    if (!user) {
      return this.bikeModel.find({ isPublic: true }).exec();
    }

    if (user.role?.toLowerCase() === 'admin') {
      return this.bikeModel.find().exec();
    }

    return this.bikeModel.find({ owner: new Types.ObjectId(user._id) }).exec();
  }

  /**
   * Get one bike by ID
   * - Guest → only if bike is public
   * - User → only if bike belongs to that user
   * - Admin → any bike
   */
  async findOne(id: string, user?: RequestWithUser['user']): Promise<Bike> {
    let bike: Bike | null;

    if (!user) {
      bike = await this.bikeModel.findOne({
        _id: new Types.ObjectId(id),
        isPublic: true,
      });
    } else if (user.role?.toLowerCase() === 'admin') {
      bike = await this.bikeModel.findById(id).exec();
    } else {
      bike = await this.bikeModel.findOne({
        _id: new Types.ObjectId(id),
        owner: new Types.ObjectId(user._id),
      });
    }

    if (!bike) throw new NotFoundException('Bike not found');
    return bike;
  }

  /**
   * Update a bike
   * - User → only own bikes
   * - Admin → any bike
   */
  async update(
    id: string,
    dto: UpdateBikeDto,
    user: RequestWithUser['user'],
  ): Promise<Bike> {
    let updated: Bike | null;

    if (user.role?.toLowerCase() === 'admin') {
      updated = await this.bikeModel
        .findByIdAndUpdate(id, dto, { new: true })
        .exec();
    } else {
      updated = await this.bikeModel.findOneAndUpdate(
        { _id: new Types.ObjectId(id), owner: new Types.ObjectId(user._id) },
        dto,
        { new: true },
      );
    }

    if (!updated) {
      throw new ForbiddenException('Bike not found or not owned by user');
    }
    return updated;
  }

  /**
   * Delete a bike
   * - User → only own bikes
   * - Admin → any bike
   */
  async remove(id: string, user: RequestWithUser['user']): Promise<Bike> {
    let deleted: Bike | null;

    if (user.role?.toLowerCase() === 'admin') {
      deleted = await this.bikeModel.findByIdAndDelete(id).exec();
    } else {
      deleted = await this.bikeModel.findOneAndDelete({
        _id: new Types.ObjectId(id),
        owner: new Types.ObjectId(user._id),
      });
    }

    if (!deleted) {
      throw new ForbiddenException('Bike not found or not owned by user');
    }
    return deleted;
  }
}
