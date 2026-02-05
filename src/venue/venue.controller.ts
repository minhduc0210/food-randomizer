import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { VenueService } from './venue.service';
import { CreateVenueDto } from './dto/create-venue.dto';
import { UpdateVenueDto } from './dto/update-venue.dto';
import { ResponseMessage } from 'src/shared/interceptors/response_message.decorator';

@Controller('venue')
export class VenueController {
  constructor(private readonly venueService: VenueService) {}

  @Post()
  @ResponseMessage('Create venue successfully')
  create(@Body() createVenueDto: CreateVenueDto) {
    return this.venueService.create(createVenueDto);
  }

  @Get()
  @ResponseMessage('Get venues successfully')
  findAll() {
    return this.venueService.findAll();
  }

  @Get(':id')
  @ResponseMessage('Get venue detail successfully')
  findOne(@Param('id') id: string) {
    return this.venueService.findOne(id);
  }

  @Patch(':id')
  @ResponseMessage('Update venue successfully')
  update(@Param('id') id: string, @Body() updateVenueDto: UpdateVenueDto) {
    return this.venueService.update(id, updateVenueDto);
  }

  @Delete(':id')
  @ResponseMessage('Delete venue successfully')
  remove(@Param('id') id: string) {
    return this.venueService.remove(id);
  }
}
