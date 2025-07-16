/**
 * Extends BaseService to manage user data.
 * Overrides methods to provide custom error handling and permission logic.
 */
import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User, UserDocument } from './schemas/user.schema';
import { BaseService } from 'src/common/base/base.service';
import { RequestWithUser } from 'src/common/types/request-with-user';

@Injectable()
export class UsersService extends BaseService<UserDocument> {
  constructor(
    @InjectModel(User.name)
    private readonly userModel: Model<UserDocument>,
  ) {
    super(userModel);
  }

  /**
   * Finds a user by ID.
   * Throws 404 if the user does not exist.
   */
  async findOne(id: string): Promise<UserDocument> {
    const user = await this.userModel.findById(id);
    if (!user) {
      throw new NotFoundException(`User with ID ${id} not found`);
    }
    return user;
  }

  /**
   * Updates a user by ID.
   * Throws 404 if the user is not found.
   */
  async update(
    id: string,
    updateDto: Partial<UserDocument>,
  ): Promise<UserDocument> {
    const updated = await this.userModel.findByIdAndUpdate(id, updateDto, {
      new: true,
    });

    if (!updated) {
      throw new NotFoundException(`User with ID ${id} not found`);
    }

    return updated;
  }

  /**
   * Soft-deletes a user by setting deletedAt timestamp.
   * Throws 404 if the user does not exist.
   */
  async remove(id: string): Promise<UserDocument> {
    const deleted = await this.userModel.findByIdAndUpdate(
      id,
      { deletedAt: new Date() },
      { new: true },
    );

    if (!deleted) {
      throw new NotFoundException(`User with ID ${id} not found`);
    }

    return deleted;
  }
  /**
   * Finds a user only if the requester is the owner or an admin.
   */
  async findByIdWithRequest(
    id: string,
    req: RequestWithUser,
  ): Promise<UserDocument> {
    const user = await this.userModel.findById(id);
    if (!user) {
      throw new NotFoundException(`User with ID ${id} not found`);
    }

    const isOwner = user._id.toString() === req.user._id.toString();
    const isAdmin = req.user.role === 'admin';

    if (!isOwner && !isAdmin) {
      throw new NotFoundException(); // Or throw ForbiddenException if preferred
    }

    return user;
  }
}
