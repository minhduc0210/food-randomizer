import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { HydratedDocument } from 'mongoose';
import { Taxonomy } from 'src/taxonomy/schemas/taxonomy.schema';

export type DishDocument = HydratedDocument<Dish>;

@Schema()
export class Dish {
  @Prop({ required: true })
  name: string;

  @Prop({ required: false })
  base_price?: number;

  @Prop({ required: false })
  description?: string;

  @Prop({ required: false })
  image?: string;

  @Prop({
    required: true,
    type: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Taxonomy' }],
    default: [],
  })
  taxonomies: Taxonomy[];
}

export const DishSchema = SchemaFactory.createForClass(Dish);
