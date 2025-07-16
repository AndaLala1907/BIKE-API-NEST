/**
 * Generic reusable service providing common CRUD operations.
 * Designed to be extended by feature-specific services.
 * Assumes that each document supports soft deletes via `deletedAt` field.
 */
import { Model, Document } from 'mongoose';
import { NotFoundException } from '@nestjs/common';

export class BaseService<T extends Document> {
  constructor(protected readonly model: Model<T>) {}

  /**
   * Create a new document
   */
  async create(data: Partial<T>): Promise<T> {
    return this.model.create(data);
  }

  /**
   * Retrieve all documents (no filtering applied)
   * This method includes even soft-deleted entries.
   * Override if you want to exclude soft-deleted ones.
   */
  async findAll(): Promise<T[]> {
    return this.model.find().exec(); // No filters applied
  }

  /**
   * Retrieve a document by ID if it's not soft-deleted
   */
  async findById(id: string): Promise<T> {
    const entity = await this.model.findOne({ _id: id, deletedAt: null });
    if (!entity) {
      throw new NotFoundException(`Entity with ID '${id}' not found`);
    }
    return entity;
  }

  /**
   * Update a document by ID if it's not soft-deleted
   */
  async update(id: string, data: Partial<T>): Promise<T> {
    const updated = await this.model.findOneAndUpdate(
      { _id: id, deletedAt: null },
      data,
      { new: true },
    );
    if (!updated) {
      throw new NotFoundException(`Entity with ID '${id}' not found`);
    }
    return updated;
  }

  /**
   * Perform a soft delete by marking the deletedAt field
   */
  async softDelete(id: string): Promise<T> {
    const deleted = await this.model.findOneAndUpdate(
      { _id: id, deletedAt: null },
      { deletedAt: new Date() },
      { new: true },
    );
    if (!deleted) {
      throw new NotFoundException(`Entity with ID '${id}' not found`);
    }
    return deleted;
  }

  /**
   * Public remove method (called from controller)
   * Internally performs a soft delete
   */
  async remove(id: string): Promise<T> {
    return this.softDelete(id);
  }
}
