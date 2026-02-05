import {
  BadRequestException,
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { CreateTaxonomyDto } from './dto/create-taxonomy.dto';
import { UpdateTaxonomyDto } from './dto/update-taxonomy.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Taxonomy } from './schemas/taxonomy.schema';
import { Model, Types } from 'mongoose';

@Injectable()
export class TaxonomyService {
  constructor(
    @InjectModel(Taxonomy.name)
    private readonly taxonomyModel: Model<Taxonomy>,
  ) {}

  async create(createTaxonomyDto: CreateTaxonomyDto): Promise<Taxonomy> {
    try {
      const created = new this.taxonomyModel(createTaxonomyDto);
      return await created.save();
    } catch (error) {
      console.log('Error creating taxonomy:', error);
      throw new InternalServerErrorException(
        error ?? 'Failed to create taxonomy',
      );
    }
  }

  async findAll(): Promise<Taxonomy[]> {
    try {
      return await this.taxonomyModel.find().lean();
    } catch (error) {
      console.log('Error fetching taxonomies:', error);
      throw new InternalServerErrorException(
        error ?? 'Failed to fetch taxonomies',
      );
    }
  }

  async findOne(id: string | number): Promise<Taxonomy> {
    try {
      const objectId = this.ensureValidObjectId(id);
      const taxonomy = await this.taxonomyModel.findById(objectId).lean();
      if (!taxonomy) {
        throw new NotFoundException('Taxonomy not found');
      }
      return taxonomy;
    } catch (error) {
      console.log('Error fetching taxonomy:', error);
      if (
        error instanceof NotFoundException ||
        error instanceof BadRequestException
      ) {
        throw error;
      }
      throw new InternalServerErrorException(
        error ?? 'Failed to fetch taxonomy',
      );
    }
  }

  async update(
    id: string | number,
    updateTaxonomyDto: UpdateTaxonomyDto,
  ): Promise<Taxonomy> {
    try {
      const objectId = this.ensureValidObjectId(id);
      const updated = await this.taxonomyModel
        .findByIdAndUpdate(objectId, updateTaxonomyDto, {
          new: true,
          runValidators: true,
        })
        .lean();

      if (!updated) {
        throw new NotFoundException('Taxonomy not found');
      }
      return updated;
    } catch (error) {
      if (
        error instanceof NotFoundException ||
        error instanceof BadRequestException
      ) {
        throw error;
      }
      console.log('Error updating taxonomy:', error);
      throw new InternalServerErrorException(
        error ?? 'Failed to update taxonomy',
      );
    }
  }

  async remove(id: string | number): Promise<void> {
    try {
      const objectId = this.ensureValidObjectId(id);
      const res = await this.taxonomyModel.findByIdAndDelete(objectId).lean();
      if (!res) {
        throw new NotFoundException('Taxonomy not found');
      }
    } catch (error) {
      console.log('Error deleting taxonomy:', error);
      if (
        error instanceof NotFoundException ||
        error instanceof BadRequestException
      ) {
        throw error;
      }
      throw new InternalServerErrorException(
        error ?? 'Failed to delete taxonomy',
      );
    }
  }

  private ensureValidObjectId(id: string | number): string {
    const value = String(id);
    if (!Types.ObjectId.isValid(value)) {
      throw new BadRequestException('Invalid taxonomy id');
    }
    return value;
  }
}
