import { Controller, Get, Post, Body, Param, Put, Delete } from '@nestjs/common';
import { AddressService } from '../services/address.service';
import { Address } from '../schemas/address.schema';
import { CreateAddressDto } from '../dto/address.dto';

@Controller('addresses')
export class AddressController {
  constructor(private readonly addressService: AddressService) {}

  @Post()
  async create(@Body() createAddressDto: CreateAddressDto): Promise<Address> {
    return this.addressService.create(createAddressDto);
  }

  @Get()
  async findAll(): Promise<Address[]> {
    return this.addressService.findAll();
  }

  @Get(':id')
  async findById(@Param('id') id: string): Promise<Address> {
    return this.addressService.findById(id);
  }

  @Put(':id')
  async update(@Param('id') id: string, @Body() addressData: Partial<Address>): Promise<Address> {
    return this.addressService.update(id, addressData);
  }

  @Delete(':id')
  async delete(@Param('id') id: string): Promise<Address> {
    return this.addressService.delete(id);
  }
}
