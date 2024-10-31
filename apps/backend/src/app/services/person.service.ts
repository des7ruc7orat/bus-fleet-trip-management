import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Person } from '../schemas/person.schema';
import { SuperService } from './super.service';

@Injectable()
export class PersonService extends SuperService<Person> {
  constructor(@InjectModel(Person.name) personModel: Model<Person>) {
    super(personModel);
  }
}
