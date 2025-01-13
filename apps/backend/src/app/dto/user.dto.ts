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
  @Matches(/^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d@$!%*?&]{8,}$/, {
    message:
      'Password must contain at least 8 characters, including at least one letter and one number.',
  })
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
  role!: Role; // Use a string for now, but this should ideally be replaced with a Role enum

  @IsString()
  username!: string;
}
