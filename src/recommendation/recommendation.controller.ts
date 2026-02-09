import { Body, Controller, Get } from '@nestjs/common';
import { RecommendationService } from './recommendation.service';
import { ResponseMessage } from 'src/shared/interceptors/response_message.decorator';
import { GetRecommendationDto } from './dto/get-recommendation.dto';

@Controller('recommendation')
export class RecommendationController {
  constructor(private readonly recommendationService: RecommendationService) {}

  @Get('dishes')
  @ResponseMessage('Get dish recommendations successfully')
  async getDishRecommendations(@Body() body: GetRecommendationDto) {
    return this.recommendationService.getDishRecommendations(body);
  }

  @Get('venues')
  @ResponseMessage('Get venue recommendations successfully')
  async getVenueRecommendations(@Body() body: GetRecommendationDto) {
    return this.recommendationService.getVenueRecommendations(body);
  }
}
