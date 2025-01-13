import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { Bus, BusSchema } from './schemas/bus.schema';
import { BusService } from './services/bus.service';
import { BusController } from './controllers/bus.controller';
import { FleetModule } from './modules/fleet.module';
import { AddressModule } from './modules/address.module';
import { TripModule } from './modules/trip.module';
import { UserModule } from './modules/user.module';
import { AuthModule } from './modules/auth.module';
@Module({
  imports: [
    MongooseModule.forRoot('mongodb://localhost:27017/bus-fleet-trip-management'),
    MongooseModule.forFeature([
      { name: Bus.name, schema: BusSchema },
    ]),
    FleetModule,
    AddressModule,
    TripModule,
    UserModule,
    AuthModule,
  ],
  controllers: [AppController, BusController],
  providers: [AppService, BusService],
  exports: [BusService],
})
export class AppModule {}
