import { Controller, Get, Post, Put, Delete, Body, Param } from '@nestjs/common';
import { BusService } from '../services/bus.service';
import { Bus } from '../schemas/bus.schema';

@Controller('buses')
export class BusController {
  constructor(private readonly busService: BusService) {}

  @Post()
  async create(@Body() busData: Partial<Bus>): Promise<Bus> {
    return this.busService.create(busData);
  }

  @Get()
  async findAll(): Promise<Bus[]> {
    return this.busService.findAll();
  }

  @Get(':id')
  async findById(@Param('id') id: string): Promise<Bus> {
    return this.busService.findById(id);
  }

  @Put(':id')
  async update(@Param('id') id: string, @Body() busData: Partial<Bus>): Promise<Bus> {
    return this.busService.update(id, busData);
  }

  @Delete(':id')
  async delete(@Param('id') id: string): Promise<Bus> {
    return this.busService.delete(id);
  }
}
