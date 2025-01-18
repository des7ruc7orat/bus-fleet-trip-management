import { IsString, IsOptional, IsNumber } from 'class-validator';

export class CreateFleetDto {
  @IsNumber()
  capacity!: number;

  @IsString()
  name!: string;  // Add 'name' field to the DTO

  @IsString()
  address!: string;  // Address is optional

  @IsOptional()
  buses?: string[];  // Optional array of buses
}
