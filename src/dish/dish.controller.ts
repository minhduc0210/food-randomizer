import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { DishService } from './dish.service';
import { CreateDishDto } from './dto/create-dish.dto';
import { UpdateDishDto } from './dto/update-dish.dto';
import { ResponseMessage } from 'src/shared/interceptors/response_message.decorator';

@Controller('dish')
export class DishController {
  constructor(private readonly dishService: DishService) {}

  @Post()
  @ResponseMessage('Create dish successfully')
  create(@Body() createDishDto: CreateDishDto) {
    return this.dishService.create(createDishDto);
  }

  @Get()
  @ResponseMessage('Get dishes successfully')
  findAll() {
    return this.dishService.findAll();
  }

  @Get(':id')
  @ResponseMessage('Get dish detail successfully')
  findOne(@Param('id') id: string) {
    return this.dishService.findOne(id);
  }

  @Patch(':id')
  @ResponseMessage('Update dish successfully')
  update(@Param('id') id: string, @Body() updateDishDto: UpdateDishDto) {
    return this.dishService.update(id, updateDishDto);
  }

  @Delete(':id')
  @ResponseMessage('Delete dish successfully')
  remove(@Param('id') id: string) {
    return this.dishService.remove(id);
  }
}
