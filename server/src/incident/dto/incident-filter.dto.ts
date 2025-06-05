import { IsOptional, IsDateString, IsString, IsArray, IsNumber } from 'class-validator';
import { Type } from 'class-transformer';

export class IncidentFilterDto {
  @IsOptional()
  @IsDateString()
  fromDate?: string;

  @IsOptional()
  @IsDateString()
  toDate?: string;

  @IsOptional()
  @IsString()
  severity?: string;

  @IsOptional()
  @IsString()
  status?: string;

  @IsOptional()
  @IsArray()
  @Type(() => Number) 
  workerIds?: number[];

  @IsOptional()
  type?: string;
}