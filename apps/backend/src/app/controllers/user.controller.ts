import { Controller, Post, Body, Get, Param, Delete } from '@nestjs/common';
import { CreateUserDto } from '../dto/user.dto';
import { User } from '../schemas/user.schema';
import { UserService } from '../services/user.service';
import { Bus } from '../schemas/bus.schema';

@Controller('users')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post()
  async create(@Body() createUserDto: CreateUserDto): Promise<User> {
    return this.userService.create(createUserDto);
  }

  @Get()
  async findAll(): Promise<User[]> {
    return this.userService.findAll();
  }

  @Get(':id')
  async findById(@Param('id') id: string): Promise<User> {
    return this.userService.findById(id);
  }
  @Delete(':id')
  async delete(@Param('id') id: string): Promise<User> {
    return this.userService.delete(id);
  }
}
