import { Type } from 'class-transformer';
import {
  IsInt,
  IsNotEmpty,
  IsNumber,
  IsString,
  Min,
} from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateProductDto {
  @ApiProperty({ description: 'Name of the product', example: 'Adidas Stan Smith' })
  @IsString()
  @IsNotEmpty({ message: 'Product name is required' })
  name_product: string;

  @ApiProperty({ description: 'Price of the product', example: 120.50 })
  @IsNumber(
    { maxDecimalPlaces: 2 },
    { message: 'Price must be a number with max 2 decimal places' },
  )
  @IsNotEmpty({ message: 'Price is required' })
  @Min(0, { message: 'Price must be greater than or equal to 0' })
  @Type(() => Number)
  price: number;

  @ApiProperty({ description: 'Minimum stock level warning', example: 10 })
  @IsInt({ message: 'Minimum stock must be an integer' })
  @IsNotEmpty({ message: 'Minimum stock is required' })
  @Min(0, { message: 'Minimum stock must be greater than or equal to 0' })
  @Type(() => Number)
  min_stock: number;

  @ApiProperty({ description: 'Current stock quantity', example: 100 })
  @IsInt({ message: 'stock must be an integer' })
  @IsNotEmpty({ message: 'stock is required' })
  @Min(0, { message: 'stock must be greater than or equal to 0' })
  @Type(() => Number)
  stock: number;

  @ApiProperty({ description: 'ID of the category', example: 1 })
  @IsInt({ message: 'Category ID must be an integer' })
  @IsNotEmpty({ message: 'Category ID is required' })
  @Type(() => Number)
  id_category: number;

  @ApiProperty({ description: 'ID of the supplier', example: 1 })
  @IsInt({ message: 'Supplier ID must be an integer' })
  @IsNotEmpty({ message: 'Supplier ID is required' })
  @Type(() => Number)
  id_supplier: number;
}

