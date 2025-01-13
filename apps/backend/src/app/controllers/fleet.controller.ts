import { Controller, Get, Post, Put, Delete, Body, Param, UseGuards } from '@nestjs/common';
import { FleetService } from '../services/fleet.service';
import { Fleet } from '../schemas/fleet.schema';
import { CreateFleetDto } from '../dto/fleet.dto';
import mongoose from 'mongoose';
import { Roles } from '../decorators/roles.decorator';
import { AuthGuard } from '@nestjs/passport';
import { RolesGuard } from '../guards/role.guard';

@UseGuards(AuthGuard('jwt'), RolesGuard) // Apply both authentication and role-based guards globally
@Controller('fleets')
export class FleetController {
  constructor(private readonly fleetService: FleetService) {}

  // Only admin can create fleets
  @Post()
  @Roles('admin') // Restrict access to only admin role
  async create(@Body() createFleetDto: CreateFleetDto): Promise<Fleet> {
    const fleetData = {
      ...createFleetDto,
      address: createFleetDto.address
        ? new mongoose.Types.ObjectId(createFleetDto.address) // Convert to ObjectId
        : undefined,
      buses: createFleetDto.buses?.map((bus) =>
        new mongoose.Types.ObjectId(bus) // Convert each bus ID to ObjectId
      ),
    };

    return this.fleetService.create(fleetData);
  }

  // Only admin can view all fleets
  @Get()
  @Roles('admin') // Restrict access to only admin role
  async findAll(): Promise<Fleet[]> {
    return this.fleetService.findAll();
  }

  // Only admin can view a fleet by ID
  @Get(':id')
  @Roles('admin') // Restrict access to only admin role
  async findById(@Param('id') id: string): Promise<Fleet> {
    return this.fleetService.findById(id);
  }

  // Only admin can update a fleet by ID
  @Put(':id')
  @Roles('admin') // Restrict access to only admin role
  async update(@Param('id') id: string, @Body() updateFleetDto: Partial<Fleet>): Promise<Fleet> {
    return this.fleetService.update(id, updateFleetDto);
  }

  // Only admin can delete a fleet by ID
  @Delete(':id')
  @Roles('admin') // Restrict access to only admin role
  async delete(@Param('id') id: string): Promise<Fleet> {
    return this.fleetService.delete(id);
  }
}
