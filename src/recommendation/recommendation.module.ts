import { Module } from '@nestjs/common';
import { RecommendationService } from './recommendation.service';
import { RecommendationController } from './recommendation.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { Taxonomy, TaxonomySchema } from 'src/taxonomy/schemas/taxonomy.schema';
import { Dish, DishSchema } from 'src/dish/schemas/dish.schema';
import { Venue, VenueSchema } from 'src/venue/schemas/venue.schema';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: Taxonomy.name, schema: TaxonomySchema },
      { name: Dish.name, schema: DishSchema },
      { name: Venue.name, schema: VenueSchema },
    ]),
  ],
  controllers: [RecommendationController],
  providers: [RecommendationService],
})
export class RecommendationModule {}
