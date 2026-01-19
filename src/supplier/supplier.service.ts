import { Injectable } from '@nestjs/common';
import { CreateSupplierDto } from './dto/create-supplier.dto';
import { UpdateSupplierDto } from './dto/update-supplier.dto';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class SupplierService {
  constructor(private prisma :PrismaService) {
  }
  async create(createSupplierDto: CreateSupplierDto) {
    const createdData = await this.prisma.supplier.create({
      data: createSupplierDto
    })
    if(!createdData){
      throw new Error('Error creating supplier')
    }
    return {
      message: 'Supplier created successfully',
      supplier: createdData
    }
  }

  async findAll() {
    const findAllSupplier = await this.prisma.supplier.findMany()
    return {
      data: findAllSupplier,
      message: 'Get all supplier successfully'
    }
  }

 async findOne(id: number) {
    const findSupplierId = await this.prisma.supplier.findFirst({
      where:{
        id: id
      }
    })
   if(!findSupplierId){
     throw new Error('Supplier not found')
   }
   return {
     data: findSupplierId,
     message: 'Get supplier successfully'
   }
  }

 async update(id: number, updateSupplierDto: UpdateSupplierDto) {
    const findSupplierId = await this.prisma.supplier.findFirst({
      where:{
        id: id
      }
    })
   if(!findSupplierId){
     throw new Error('Supplier not found')
   }
   const updateData = await this.prisma.supplier.update({
     where:{
       id: id
     },
     data: updateSupplierDto
   })
   return {
     message: 'Update supplier successfully',
     supplier: updateData
   }
  }

 async remove(id: number) {
    const findId = await this.prisma.supplier.findFirst({
      where:{
        id: id
      }
    })
   if(!findId){
     throw new Error('Supplier not found')
   }
   const deleteSupplier = await this.prisma.supplier.delete({
     where:{
       id: id
     }
   })
   return {
     message: 'Delete supplier successfully',
     data: deleteSupplier
   }
  }
}
