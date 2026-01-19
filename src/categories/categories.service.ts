import { Injectable } from '@nestjs/common';
import { CreateCategoryDto } from './dto/create-category.dto';
import { UpdateCategoryDto } from './dto/update-category.dto';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class CategoriesService {
  constructor(private prisma: PrismaService) {}
  async create(createCategoryDto: CreateCategoryDto) {
    const dataCategory = await this.prisma.categories.create({
      data: createCategoryDto,
    });
    if(!dataCategory){
      throw new Error('Error creating category')
    }
    return {
      message: 'Category created successfully',
      category: dataCategory
    }
  }

 async findAll() {
   const findAllCategory = await this.prisma.categories.findMany()
   return {
     data: findAllCategory,
     message: 'Get all categories successfully'
   }
  }

  async findOne(id: number) {
    const findCategories = await this.prisma.categories.findFirst({
      where:{
        id: id
      }
    })
    if(!findCategories){
      throw new Error('Category not found')
    }
    return {
      data: findCategories,
      message: 'Get category successfully'
    }
  }

  async update(id: number, updateCategoryDto: UpdateCategoryDto) {
    const findCategories = await this.prisma.categories.findFirst({
      where: {
        id: id,
      }
    })
    if(!findCategories){
     throw new Error('Category not found')
    }

    const updateData = await this.prisma.categories.update({
      where: {
        id: id,
      },
      data: updateCategoryDto
    })

    return {
      message: 'Update category successfully',
      category: updateData
    }
  }

  async remove(id: number) {
    const findId = await this.prisma.categories.findFirst({
      where: {
        id: id,
      }
    })
    if(!findId){
      throw new Error('Category not found')
    }
    const deleteData = await this.prisma.categories.delete({
      where: {
        id: id,
      }
    })
    return {
      message: 'Delete category successfully',
      data: deleteData
    }
  }
}
