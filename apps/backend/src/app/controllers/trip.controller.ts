import { Controller, Get, Post, Put, Delete, Body, Param } from '@nestjs/common';
import { TripService } from '../services/trip.service';
import { Trip } from '../schemas/trip.schema';

@Controller('trips')
export class TripController {
  constructor(private readonly tripService: TripService) {}

  // Create a new trip
  @Post()
  async create(@Body() tripData: Partial<Trip>): Promise<Trip> {
    return this.tripService.create(tripData);
  }

  // Get all trips
  @Get()
  async findAll(): Promise<Trip[]> {
    return this.tripService.findAll();
  }

  // Get a trip by ID
  @Get(':id')
  async findById(@Param('id') id: string): Promise<Trip> {
    return this.tripService.findById(id);
  }

  // Update a trip by ID
  @Put(':id')
  async update(@Param('id') id: string, @Body() updateTripDto: Partial<Trip>): Promise<Trip> {
    return this.tripService.update(id, updateTripDto);
  }

  // Delete a trip by ID
  @Delete(':id')
  async delete(@Param('id') id: string): Promise<Trip> {
    return this.tripService.delete(id);
  }
}
