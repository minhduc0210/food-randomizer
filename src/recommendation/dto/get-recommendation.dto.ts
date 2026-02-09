import { IsArray, IsMongoId, IsOptional } from 'class-validator';

export class GetRecommendationDto {
  @IsArray({ message: 'taxonomyIds must be an array' })
  @IsOptional()
  @IsMongoId({ each: true, message: 'Each taxonomyId must be a valid MongoID' })
  taxonomyIds?: string[];
}
