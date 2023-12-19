import { IsNumberString, IsOptional } from 'class-validator';

export abstract class PaginateDataQueryDto {
  @IsOptional()
  @IsNumberString()
  page: number;

  @IsOptional()
  @IsNumberString()
  perPage: number;
}
