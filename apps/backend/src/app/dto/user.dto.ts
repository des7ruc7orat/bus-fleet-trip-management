import { IsString, IsEmail, IsOptional, IsDate, Matches, IsEnum } from 'class-validator';
import { Transform } from 'class-transformer';
import { Types } from 'mongoose';
import { Role } from '../enums/role.enum';

export class CreateUserDto {
  @IsString()
  firstName!: string;

  @IsString()
  lastName!: string;

  @IsEmail()
  email!: string;

  @IsString()
  password!: string;

  @IsString()
  @IsOptional()
  phoneNumber?: string;

  @IsDate()
  @IsOptional()
  bornDate?: Date;

  @IsString()
  @IsOptional()
  @Transform(({ value }) => (Types.ObjectId.isValid(value) ? value : null), { toClassOnly: true })
  address?: string;

  @IsEnum(Role, { message: 'Invalid role' })
  role!: Role;

  @IsString()
  username!: string;
}
