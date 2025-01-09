import { IsNumber, IsString, IsOptional, IsArray } from 'class-validator';

export class CreateBusDto {
  @IsString()
  name!: string; // Name of the bus (required)

  @IsNumber()
  capacity!: number;

  @IsString()
  color!: string;

  @IsNumber()
  kg!: number;

  @IsString()
  @IsOptional()
  fleet?: string; // Fleet ID as string

  @IsArray()
  @IsString({ each: true })
  @IsOptional()
  trips?: string[]; // Array of Trip IDs as strings

  @IsString()
  @IsOptional()
  driver?: string; // Driver ID as string
}
