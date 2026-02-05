import {
  Injectable,
  InternalServerErrorException,
  NotFoundException,
  BadRequestException,
} from '@nestjs/common';
import { CreateDishDto } from './dto/create-dish.dto';
import { UpdateDishDto } from './dto/update-dish.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Dish } from './schemas/dish.schema';
import { Model, isValidObjectId } from 'mongoose';

@Injectable()
export class DishService {
  constructor(@InjectModel(Dish.name) private dishModel: Model<Dish>) {}

  async create(createDishDto: CreateDishDto): Promise<Dish> {
    try {
      const createdDish = new this.dishModel(createDishDto);
      return await createdDish.save();
    } catch (error) {
      console.error('Error creating dish:', error);
      throw new InternalServerErrorException('Error creating dish');
    }
  }

  async findAll(): Promise<Dish[]> {
    try {
      return await this.dishModel.find().exec();
    } catch (error) {
      console.error('Error fetching dishes:', error);
      throw new InternalServerErrorException('Error fetching dishes');
    }
  }

  async findOne(id: string): Promise<Dish> {
    if (!isValidObjectId(id)) {
      throw new BadRequestException('Invalid dish id');
    }

    try {
      const dish = await this.dishModel.findById(id).exec();
      if (!dish) {
        throw new NotFoundException('Dish not found');
      }
      return dish;
    } catch (error) {
      if (
        error instanceof NotFoundException ||
        error instanceof BadRequestException
      ) {
        throw error;
      }
      console.error('Error fetching dish:', error);
      throw new InternalServerErrorException('Error fetching dish');
    }
  }

  async update(id: string, updateDishDto: UpdateDishDto): Promise<Dish> {
    if (!isValidObjectId(id)) {
      throw new BadRequestException('Invalid dish id');
    }

    try {
      const updated = await this.dishModel
        .findByIdAndUpdate(id, updateDishDto, { new: true })
        .exec();

      if (!updated) {
        throw new NotFoundException('Dish not found');
      }
      return updated;
    } catch (error) {
      if (
        error instanceof NotFoundException ||
        error instanceof BadRequestException
      ) {
        throw error;
      }
      console.error('Error updating dish:', error);
      throw new InternalServerErrorException('Error updating dish');
    }
  }

  async remove(id: string): Promise<Dish> {
    if (!isValidObjectId(id)) {
      throw new BadRequestException('Invalid dish id');
    }

    try {
      const deleted = await this.dishModel.findByIdAndDelete(id).exec();
      if (!deleted) {
        throw new NotFoundException('Dish not found');
      }
      return deleted;
    } catch (error) {
      if (
        error instanceof NotFoundException ||
        error instanceof BadRequestException
      ) {
        throw error;
      }
      console.error('Error removing dish:', error);
      throw new InternalServerErrorException('Error removing dish');
    }
  }
}
