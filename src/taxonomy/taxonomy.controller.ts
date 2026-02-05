import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { TaxonomyService } from './taxonomy.service';
import { CreateTaxonomyDto } from './dto/create-taxonomy.dto';
import { UpdateTaxonomyDto } from './dto/update-taxonomy.dto';
import { ResponseMessage } from 'src/shared/interceptors/response_message.decorator';

@Controller('taxonomy')
export class TaxonomyController {
  constructor(private readonly taxonomyService: TaxonomyService) {}

  @Post()
  @ResponseMessage('Create taxonomy successfully')
  create(@Body() createTaxonomyDto: CreateTaxonomyDto) {
    return this.taxonomyService.create(createTaxonomyDto);
  }

  @Get()
  findAll() {
    return this.taxonomyService.findAll();
  }

  @Get(':id')
  @ResponseMessage('Get taxonomy detail successfully')
  findOne(@Param('id') id: string) {
    return this.taxonomyService.findOne(id);
  }

  @Patch(':id')
  @ResponseMessage('Update taxonomy successfully')
  update(
    @Param('id') id: string,
    @Body() updateTaxonomyDto: UpdateTaxonomyDto,
  ) {
    return this.taxonomyService.update(id, updateTaxonomyDto);
  }

  @Delete(':id')
  @ResponseMessage('Delete taxonomy successfully')
  remove(@Param('id') id: string) {
    return this.taxonomyService.remove(id);
  }
}
