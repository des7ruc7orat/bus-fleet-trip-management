import { IsString } from 'class-validator';

export class CreateAddressDto {
  @IsString()
  name: string;

  @IsString()
  city: string;

  @IsString()
  postCode: string;

  @IsString()
  street: string;

  @IsString()
  streetNumber: string;
}
