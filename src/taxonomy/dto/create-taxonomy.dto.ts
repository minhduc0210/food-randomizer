import { IsEnum, IsNotEmpty, IsOptional, IsString } from 'class-validator';
import { TaxonomyType } from 'src/shared/enums/taxonomy.enums';

export class CreateTaxonomyDto {
  @IsString()
  @IsNotEmpty()
  name: string;

  @IsEnum(TaxonomyType)
  @IsOptional()
  type?: TaxonomyType;

  @IsString()
  @IsOptional()
  description?: string;
}
