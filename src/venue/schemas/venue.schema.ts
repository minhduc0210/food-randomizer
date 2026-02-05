import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { HydratedDocument } from 'mongoose';
import { Dish } from 'src/dish/schemas/dish.schema';
import { Taxonomy } from 'src/taxonomy/schemas/taxonomy.schema';

export type VenueDocument = HydratedDocument<Venue>;

@Schema()
export class Venue {
  @Prop({ required: true })
  name: string;

  @Prop({ required: false })
  average_price?: number;

  @Prop({ required: false })
  description?: string;

  @Prop({ required: false })
  images?: [string];

  @Prop({ required: false })
  addresses?: [string];

  @Prop({
    required: true,
    type: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Taxonomy' }],
    default: [],
  })
  taxonomies: Taxonomy[];

  @Prop({
    required: true,
    type: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Dish' }],
    default: [],
  })
  dishes: Dish[];
}

export const VenueSchema = SchemaFactory.createForClass(Venue);
