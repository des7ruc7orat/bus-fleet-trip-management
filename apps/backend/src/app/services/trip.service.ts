// trip.service.ts
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
}
