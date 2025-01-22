import { Controller, Get, Post, Put, Delete, Body, Param, Req, UseGuards } from '@nestjs/common';
import { TripService } from '../services/trip.service';
import { Trip } from '../schemas/trip.schema';
import { Roles } from '../decorators/roles.decorator';
import { AuthGuard } from '@nestjs/passport';
import { Request } from 'express';
import { RolesGuard } from '../guards/role.guard';

@UseGuards(AuthGuard('jwt'), RolesGuard) // Applying both authentication and role guards
@Controller('trips')
export class TripController {
  constructor(private readonly tripService: TripService) {}

  // Create trip - Only admins
  @Post()
  @Roles('admin') // Only admins can create trips
  async create(@Body() tripData: Partial<Trip>): Promise<Trip> {
    return this.tripService.create(tripData);
  }

  // Get all trips - Role-based
  @Get()
  @Roles('admin', 'driver') // Both roles can access this endpoint
  async findAll(): Promise<Trip[]> {
    // const user = req.user; // Get the authenticated user
    return this.tripService.findAll(); // Pass role and user._id to service
  }

  // Get trip by ID - Role-based
  @Get(':id')
  @Roles('admin') // Both roles can access this endpoint
  async findById(@Req() req: Request, @Param('id') tripId: string): Promise<Trip> {
    //const user = req.user; // TypeScript knows that req.user has _id and role
    //return this.tripService.findByIdWithRole(user.role, user._id.toString(), tripId); // Pass role and user._id to service
    return this.tripService.findById(tripId);
  }


  // Update trip - Only admins
  @Put(':id')
  @Roles('admin') // Only admins can update trips
  async update(@Param('id') id: string, @Body() updateTripDto: Partial<Trip>): Promise<Trip> {
    return this.tripService.update(id, updateTripDto);
  }

  // Delete trip - Only admins
  @Delete(':id')
  @Roles('admin') // Only admins can delete trips
  async delete(@Param('id') id: string): Promise<Trip> {
    return this.tripService.delete(id);
  }
}
