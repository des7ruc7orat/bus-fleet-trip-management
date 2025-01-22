import { IsNotEmpty, IsString, IsDateString } from 'class-validator';

export class CreateTripDto {
  @IsString()
  @IsNotEmpty()
  name: string; // Expecting a string ID for the bus reference
  @IsString()
  @IsNotEmpty()
  bus: string; // Expecting a string ID for the bus reference

  @IsString()
  @IsNotEmpty()
  beginningPoint: string; // Expecting a string ID for the beginningPoint reference

  @IsString()
  @IsNotEmpty()
  endingPoint: string; // Expecting a string ID for the endingPoint reference

  @IsDateString()
  startingTime: Date;

  @IsDateString()
  arrivingTime: Date;
}
