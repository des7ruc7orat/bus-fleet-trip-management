import { IsNumber, IsString, IsOptional } from 'class-validator';

export class CreateBusDto {
  @IsNumber()
  capacity: number;

  @IsString()
  color: string;

  @IsNumber()
  kg: number;

  @IsString()
  @IsOptional()
  fleet?: string;

  @IsString({ each: true })
  @IsOptional()
  trips?: string[];

  @IsString()
  @IsOptional()
  driver?: string;
}
