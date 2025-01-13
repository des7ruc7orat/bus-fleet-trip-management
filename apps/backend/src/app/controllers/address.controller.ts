import { Controller, Get, Post, Body, Param, Put, Delete, UseGuards } from '@nestjs/common';
import { AddressService } from '../services/address.service';
import { Address } from '../schemas/address.schema';
import { CreateAddressDto } from '../dto/address.dto';
import { Roles } from '../decorators/roles.decorator';
import { AuthGuard } from '@nestjs/passport';
import { RolesGuard } from '../guards/role.guard';

@UseGuards(AuthGuard('jwt'), RolesGuard) // Apply both authentication and role-based guards globally
@Controller('addresses')
export class AddressController {
  constructor(private readonly addressService: AddressService) {}

  // Only admin can create addresses
  @Post()
  @Roles('admin') // Restrict access to only admin role
  async create(@Body() createAddressDto: CreateAddressDto): Promise<Address> {
    return this.addressService.create(createAddressDto);
  }

  // Only admin can view all addresses
  @Get()
  @Roles('admin') // Restrict access to only admin role
  async findAll(): Promise<Address[]> {
    return this.addressService.findAll();
  }

  // Only admin can view an address by ID
  @Get(':id')
  @Roles('admin') // Restrict access to only admin role
  async findById(@Param('id') id: string): Promise<Address> {
    return this.addressService.findById(id);
  }

  // Only admin can update an address by ID
  @Put(':id')
  @Roles('admin') // Restrict access to only admin role
  async update(@Param('id') id: string, @Body() addressData: Partial<Address>): Promise<Address> {
    return this.addressService.update(id, addressData);
  }

  // Only admin can delete an address by ID
  @Delete(':id')
  @Roles('admin') // Restrict access to only admin role
  async delete(@Param('id') id: string): Promise<Address> {
    return this.addressService.delete(id);
  }
}
