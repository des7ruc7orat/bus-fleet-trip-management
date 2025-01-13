import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Trip } from '../schemas/trip.schema';
import { SuperService } from './super.service';

@Injectable()
export class TripService extends SuperService<Trip> {
  constructor(@InjectModel(Trip.name) tripModel: Model<Trip>) {
    super(tripModel);
  }

  async findByIdWithRole(role: string, userId: string, tripId: string): Promise<Trip> {
    if (role === 'admin') {
      // Admin can access any trip
      return this.model.findById(tripId).exec();
    } else {
      // Driver can only access their own trips
      return this.model.findOne({ _id: tripId, 'driver._id': userId }).exec();
    }
  }

  /**
   * Find all trips with role-based filtering
   * @param userRole - Role of the user ('admin' or 'driver')
   * @param userId - The user's ID
   */
  async findAllWithRole(userRole: string, userId?: string): Promise<Trip[]> {
    if (userRole === 'driver') {
      // If the user is a driver, return only trips assigned to the buses they are driving
      return this.model.find({ bus: { driver: userId } }).exec(); // Assuming the Trip has a `bus` field
    }
    // Admin can view all trips
    return this.model.find().exec();
  }
}
