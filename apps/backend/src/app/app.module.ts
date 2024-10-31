import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { Bus, BusSchema } from './schemas/bus.schema';
import { Person, PersonSchema } from './schemas/person.schema';
import { Role, RoleSchema } from './schemas/role.schema';
import { Address, AddressSchema } from './schemas/address.schema';
import { Fleet, FleetSchema } from './schemas/fleet.schema';
import { Trip, TripSchema } from './schemas/trip.schema';
import { BusService } from './services/bus.service';
import { PersonService } from './services/person.service';
import { RoleService } from './services/role.service';
import { AddressService } from './services/address.service';
import { FleetService } from './services/fleet.service';
import { TripService } from './services/trip.service';
@Module({
  imports: [
    MongooseModule.forRoot('mongodb://localhost:27017/bus-fleet-trip-management'),
    MongooseModule.forFeature([
      { name: Bus.name, schema: BusSchema },
      { name: Person.name, schema: PersonSchema },
      { name: Role.name, schema: RoleSchema },
      { name: Address.name, schema: AddressSchema },
      { name: Fleet.name, schema: FleetSchema },
      { name: Trip.name, schema: TripSchema },
    ]),
  ],
  controllers: [AppController],
  providers: [AppService, BusService, PersonService, RoleService, AddressService, FleetService, TripService],
  exports: [BusService, PersonService, RoleService, AddressService, FleetService, TripService],
})
export class AppModule {}
