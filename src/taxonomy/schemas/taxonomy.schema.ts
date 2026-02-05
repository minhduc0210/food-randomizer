import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';
import { TaxonomyType } from 'src/shared/enums/taxonomy.enums';

export type TaxonomyDocument = HydratedDocument<Taxonomy>;

@Schema()
export class Taxonomy {
  @Prop({ required: true })
  name: string;

  @Prop({
    required: true,
    enum: Object.values(TaxonomyType),
    type: String,
    default: TaxonomyType.TYPE,
  })
  type: TaxonomyType;

  @Prop({ required: false })
  description?: string;
}

export const TaxonomySchema = SchemaFactory.createForClass(Taxonomy);
