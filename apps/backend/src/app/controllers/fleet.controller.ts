import { Controller, Get, Post, Put, Delete, Body, Param } from '@nestjs/common';
import { FleetService } from '../services/fleet.service';
import { Fleet } from '../schemas/fleet.schema';
import { CreateFleetDto } from '../dto/fleet.dto';
import mongoose from 'mongoose';

@Controller('fleets')
export class FleetController {
  constructor(private readonly fleetService: FleetService) {}

  // Create a new fleet
  @Post()
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

  // Get all fleets
  @Get()
  async findAll(): Promise<Fleet[]> {
    return this.fleetService.findAll();
  }

  // Get a fleet by ID
  @Get(':id')
  async findById(@Param('id') id: string): Promise<Fleet> {
    return this.fleetService.findById(id);
  }

  // Update a fleet by ID
  @Put(':id')
  async update(@Param('id') id: string, @Body() updateFleetDto: Partial<Fleet>): Promise<Fleet> {
    return this.fleetService.update(id, updateFleetDto);
  }

  // Delete a fleet by ID
  @Delete(':id')
  async delete(@Param('id') id: string): Promise<Fleet> {
    return this.fleetService.delete(id);
  }
}
