import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { Trip, TripSchema } from '../schemas/trip.schema';
import { TripService } from '../services/trip.service';
import { TripController } from '../controllers/trip.controller';
import { Address, AddressSchema } from '../schemas/address.schema';
import { Bus, BusSchema } from '../schemas/bus.schema';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: Trip.name, schema: TripSchema },
      { name: Address.name, schema: AddressSchema },
      { name: Bus.name, schema: BusSchema },
    ]),
  ],
  controllers: [TripController],
  providers: [TripService],
})
export class TripModule {}
