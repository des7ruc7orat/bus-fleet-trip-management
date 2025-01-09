import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { Fleet, FleetSchema } from '../schemas/fleet.schema';
import { Address, AddressSchema } from '../schemas/address.schema';
import { Bus, BusSchema } from '../schemas/bus.schema';
import { FleetController } from '../controllers/fleet.controller';
import { FleetService } from '../services/fleet.service';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: Fleet.name, schema: FleetSchema },
      { name: Address.name, schema: AddressSchema }, // If you're using Address schema
      { name: Bus.name, schema: BusSchema }, // If you're using Bus schema
    ]),
  ],
  controllers: [FleetController],
  providers: [FleetService],
})
export class FleetModule {}
