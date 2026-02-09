import { Injectable } from '@nestjs/common';
import { Model } from 'mongoose';
import { Dish } from 'src/dish/schemas/dish.schema';
import { Venue } from 'src/venue/schemas/venue.schema';
import { GetRecommendationDto } from './dto/get-recommendation.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Taxonomy } from 'src/taxonomy/schemas/taxonomy.schema';

@Injectable()
export class RecommendationService {
  constructor(
    @InjectModel(Dish.name) private readonly dishModel: Model<Dish>,
    @InjectModel(Venue.name) private readonly venueModel: Model<Venue>,
    @InjectModel(Taxonomy.name) private readonly taxonomyModel: Model<Taxonomy>,
  ) {}

  private async getCandidates(
    model: Model<Dish | Venue>,
    body: GetRecommendationDto,
  ): Promise<Dish[] | Venue[]> {
    try {
      const { taxonomyIds } = body;
      let filter = {};
      if (taxonomyIds && taxonomyIds.length > 0)
        filter = { taxonomies: { $in: taxonomyIds } };
      const result = await model.find(filter).populate('taxonomies').lean();
      return result;
    } catch (error) {
      console.log('Error fetching candidates:', error);
      throw error;
    }
  }

  async getDishRecommendations(body: GetRecommendationDto) {
    return this.getCandidates(this.dishModel, body);
  }

  async getVenueRecommendations(body: GetRecommendationDto) {
    return this.getCandidates(this.venueModel, body);
  }
}
