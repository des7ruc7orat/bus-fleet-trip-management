import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Bus } from '../schemas/bus.schema';
import { SuperService } from './super.service';

@Injectable()
export class BusService extends SuperService<Bus> {
  constructor(@InjectModel(Bus.name) busModel: Model<Bus>) {
    super(busModel);
  }
}
