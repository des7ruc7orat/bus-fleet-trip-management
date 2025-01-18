import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { SuperService } from './super.service';
import { User } from '../schemas/user.schema';
import * as bcrypt from 'bcrypt';

@Injectable()
export class UserService extends SuperService<User> {
  constructor(@InjectModel(User.name) userModel: Model<User>) {
    super(userModel);
  }

  // Find a user by email
  async findOneByEmail(email: string): Promise<User | null> {
    return await this.model.findOne({ email }).exec();
  }
  // Validate the entered password with the stored hashed password
  async validatePassword(
    enteredPassword: string,
    storedPassword: string
  ): Promise<boolean> {
    return await bcrypt.compare(enteredPassword, storedPassword);
  }
}
