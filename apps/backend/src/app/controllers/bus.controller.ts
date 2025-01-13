import { Controller, Get, Post, Put, Delete, Body, Param, UseGuards } from '@nestjs/common';
import { BusService } from '../services/bus.service';
import { Bus } from '../schemas/bus.schema';
import { Roles } from '../decorators/roles.decorator';
import { AuthGuard } from '@nestjs/passport';
import { RolesGuard } from '../guards/role.guard';

@UseGuards(AuthGuard('jwt'), RolesGuard) // Apply both authentication and role-based guards globally
@Controller('buses')
export class BusController {
  constructor(private readonly busService: BusService) {}

  // Only admin can create buses
  @Post()
  @Roles('admin')
  async create(@Body() busData: Partial<Bus>): Promise<Bus> {
    return this.busService.create(busData);
  }

  // Both admin and driver can view buses
  @Get()
  @Roles('admin', 'driver') // Both roles can access this endpoint
  async findAll(): Promise<Bus[]> {
    return this.busService.findAll();
  }

  // Both admin and driver can view bus by ID
  @Get(':id')
  @Roles('admin', 'driver') // Both roles can access this endpoint
  async findById(@Param('id') id: string): Promise<Bus> {
    return this.busService.findById(id);
  }

  // Only admin can update a bus
  @Put(':id')
  @Roles('admin')
  async update(@Param('id') id: string, @Body() busData: Partial<Bus>): Promise<Bus> {
    return this.busService.update(id, busData);
  }

  // Only admin can delete a bus
  @Delete(':id')
  @Roles('admin')
  async delete(@Param('id') id: string): Promise<Bus> {
    return this.busService.delete(id);
  }
}
