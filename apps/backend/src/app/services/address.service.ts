import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Address } from '../schemas/address.schema';
import { SuperService } from './super.service';

@Injectable()
export class AddressService extends SuperService<Address> {
  constructor(@InjectModel(Address.name) addressModel: Model<Address>) {
    super(addressModel);
  }
}
