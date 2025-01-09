import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { Bus, BusSchema } from './schemas/bus.schema';
import { Person, PersonSchema } from './schemas/person.schema';
import { BusService } from './services/bus.service';
import { PersonService } from './services/person.service';
import { BusController } from './controllers/bus.controller';
import { FleetModule } from './modules/fleet.module';
import { AddressModule } from './modules/address.module';
import { TripModule } from './modules/trip.module';
@Module({
  imports: [
    MongooseModule.forRoot('mongodb://localhost:27017/bus-fleet-trip-management'),
    MongooseModule.forFeature([
      { name: Bus.name, schema: BusSchema },
      { name: Person.name, schema: PersonSchema },
    ]),
    FleetModule,
    AddressModule,
    TripModule,
  ],
  controllers: [AppController, BusController],
  providers: [AppService, BusService, PersonService],
  exports: [BusService, PersonService],
})
export class AppModule {}
