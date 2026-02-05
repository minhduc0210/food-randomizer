import { Module } from '@nestjs/common';
import { TaxonomyService } from './taxonomy.service';
import { TaxonomyController } from './taxonomy.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { Taxonomy, TaxonomySchema } from './schemas/taxonomy.schema';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: Taxonomy.name, schema: TaxonomySchema },
    ]),
  ],
  controllers: [TaxonomyController],
  providers: [TaxonomyService],
})
export class TaxonomyModule {}
