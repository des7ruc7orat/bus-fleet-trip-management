import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { User, UserSchema } from '../schemas/user.schema';
import { UserController } from '../controllers/user.controller';
import { UserService } from '../services/user.service';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: User.name, schema: UserSchema }]), // Mongoose integration
  ],
  controllers: [UserController], // Controllers for handling HTTP requests
  providers: [UserService], // Services for business logic
  exports: [UserService], // Exporting the service for use in other modules
})
export class UserModule {}
