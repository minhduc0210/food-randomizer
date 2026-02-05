import {
  Injectable,
  InternalServerErrorException,
  NotFoundException,
  BadRequestException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, isValidObjectId } from 'mongoose';
import { CreateVenueDto } from './dto/create-venue.dto';
import { UpdateVenueDto } from './dto/update-venue.dto';
import { Venue } from './schemas/venue.schema';

@Injectable()
export class VenueService {
  constructor(@InjectModel(Venue.name) private venueModel: Model<Venue>) {}

  async create(createVenueDto: CreateVenueDto): Promise<Venue> {
    try {
      const createdVenue = new this.venueModel(createVenueDto);
      return await createdVenue.save();
    } catch (error) {
      console.error('Error creating venue:', error);
      throw new InternalServerErrorException('Error creating venue');
    }
  }

  async findAll(): Promise<Venue[]> {
    try {
      return await this.venueModel.find().exec();
    } catch (error) {
      console.error('Error fetching venues:', error);
      throw new InternalServerErrorException('Error fetching venues');
    }
  }

  async findOne(id: string): Promise<Venue> {
    if (!isValidObjectId(id)) {
      throw new BadRequestException('Invalid venue id');
    }

    try {
      const venue = await this.venueModel.findById(id).exec();
      if (!venue) {
        throw new NotFoundException('Venue not found');
      }
      return venue;
    } catch (error) {
      if (
        error instanceof NotFoundException ||
        error instanceof BadRequestException
      ) {
        throw error;
      }
      console.error('Error fetching venue:', error);
      throw new InternalServerErrorException('Error fetching venue');
    }
  }

  async update(id: string, updateVenueDto: UpdateVenueDto): Promise<Venue> {
    if (!isValidObjectId(id)) {
      throw new BadRequestException('Invalid venue id');
    }

    try {
      const updated = await this.venueModel
        .findByIdAndUpdate(id, updateVenueDto, { new: true })
        .exec();

      if (!updated) {
        throw new NotFoundException('Venue not found');
      }
      return updated;
    } catch (error) {
      if (
        error instanceof NotFoundException ||
        error instanceof BadRequestException
      ) {
        throw error;
      }
      console.error('Error updating venue:', error);
      throw new InternalServerErrorException('Error updating venue');
    }
  }

  async remove(id: string): Promise<Venue> {
    if (!isValidObjectId(id)) {
      throw new BadRequestException('Invalid venue id');
    }

    try {
      const deleted = await this.venueModel.findByIdAndDelete(id).exec();
      if (!deleted) {
        throw new NotFoundException('Venue not found');
      }
      return deleted;
    } catch (error) {
      if (
        error instanceof NotFoundException ||
        error instanceof BadRequestException
      ) {
        throw error;
      }
      console.error('Error removing venue:', error);
      throw new InternalServerErrorException('Error removing venue');
    }
  }
}
