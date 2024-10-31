import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Fleet } from '../schemas/fleet.schema';
import { SuperService } from './super.service';

@Injectable()
export class FleetService extends SuperService<Fleet> {
  constructor(@InjectModel(Fleet.name) fleetModel: Model<Fleet>) {
    super(fleetModel);
  }
}
