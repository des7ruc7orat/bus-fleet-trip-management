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
    const user = await this.model.findOne({ email }).exec();
    console.log('User retrieved by email:', user); // Log user details
    return user;  }
  // Validate the entered password with the stored hashed password
  async validatePassword(
    enteredPassword: string,
    storedPassword: string
  ): Promise<boolean> {
    console.log('Entered password:', enteredPassword);
    console.log('Stored password hash:', storedPassword);
    const isValid = await bcrypt.compare(enteredPassword, storedPassword);
    console.log('Password match result:', isValid);
    return isValid;
  }
}
