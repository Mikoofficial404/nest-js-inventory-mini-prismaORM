import { BadRequestException, Injectable } from '@nestjs/common';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { PrismaService } from 'src/prisma/prisma.service';
import { unlink } from 'fs/promises';
import { existsSync } from 'fs';
import { join } from 'path';


@Injectable()
export class ProductsService {
  constructor(private prisma: PrismaService) { }
  async create(createProductDto: CreateProductDto, file: Express.Multer.File) {
    const findCategory = await this.prisma.products.findFirst({
      where: {
        id_category: createProductDto.id_category,
      },
    })
    if(!findCategory){
      throw new BadRequestException('Category not found')
    }
    const findSupplier = await this.prisma.supplier.findFirst({
      where: {
        id: createProductDto.id_supplier,
      },
    })
    if(!findSupplier){
      throw new BadRequestException('Supplier not found')
    }
    if (!file) {
      throw new BadRequestException('no file uploaded');
    }
    const allowedMimeTypes = ['image/jpeg', 'image/png', 'image/jpg'];
    if (!allowedMimeTypes.includes(file.mimetype)) {
      throw new BadRequestException('invalid file type');
    }
    const maxSize = 5 * 1024 * 1024;
    if (file.size > maxSize) {
      throw new BadRequestException('file is too large!');
    }
    const createData = await this.prisma.products.create({
      data: {
        name_product: createProductDto.name_product,
        price: createProductDto.price,
        min_stock: createProductDto.min_stock,
        stock: createProductDto.stock,
        id_category: createProductDto.id_category,
        id_supplier: createProductDto.id_supplier,
        image: file.filename,
      },
    });
    return {
      message: 'Product created successfully',
      product: createData,
    };
  }

  async findAll() {
    const dataProduct = await this.prisma.products.findMany();
    return {
      data: dataProduct,
      messages: 'Get all products successfully',
    };
  }

  async findOne(id: number) {
    const dataProduct = await this.prisma.products.findFirst({
      where: {
        id: id,
      },
    });
    return {
      data: dataProduct,
      message: 'Get product successfully',
    };
  }

  async update(id: number, updateProductDto: UpdateProductDto, image: Express.Multer.File) {
    const dataProduct = await this.prisma.products.findUnique({
      where: {
        id: id,
      },
    });
    if (!dataProduct) {
      throw new BadRequestException('Product not found');
    }

    const dataToUpdate: Partial<UpdateProductDto> & { image?: string } = { ...updateProductDto };

    if (image) {
      if (dataProduct.image) {
        const oldImagePath = join(
          process.cwd(),
          'public/uploads/images',
          dataProduct.image,
        );
        try {
          if (existsSync(oldImagePath)) {
            await unlink(oldImagePath);
          }
        } catch (err) {
          console.error('Failed to delete old image:', err.message);
        }
      }
      dataToUpdate.image = image.filename;
    }

    return this.prisma.products.update({
      where: { id },
      data: dataToUpdate,
    });
  }

  async remove(id: number) {
    const dataProduct = await this.prisma.products.findFirst({
      where: {
        id: id,
      },
    });
    if (!dataProduct) {
      throw new BadRequestException('Product not found');
    }

    if (dataProduct.image) {
      const filePath = join(
        process.cwd(),
        'public/uploads/images',
        dataProduct.image
      );
      if (existsSync(filePath)) {
        await unlink(filePath);
      }
    }
    const deleteData = await this.prisma.products.delete({
      where: {
        id: id,
      },
    });

    return {
      message: 'Product deleted successfully',
      data: deleteData,
    };
  }

  async findMinStock(id: number) {
    const product = await this.prisma.products.findUnique({
      where: {
        id: id,
      },
      select: {
        name_product: true,
        min_stock: true,
        stock: true,
      },
    });
    if (!product) {
      throw new BadRequestException('Product not found');
    }

    if (product.stock <= product.min_stock) {
      return {
        status: 'WARNING',
        message: `Product ${product.name_product} stock is low! Current: ${product.stock}, Min: ${product.min_stock}`,
      };
    }
    return {
      status: 'OK',
      message: 'Product stock is ok',
    };
  }

  async findAllLowStock() {

    const lowStockProducts = await this.prisma.products.findMany({
      where: {
        stock: {
          lte: this.prisma.products.fields.min_stock,
        },
      },
    });

    return {
      count: lowStockProducts.length,
      data: lowStockProducts,
      message: 'Get all low stock products successfully',
    };
  }
}
