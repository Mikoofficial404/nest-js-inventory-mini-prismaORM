import { IsInt, IsNotEmpty, IsOptional, IsEnum } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import { StockReason, StockMovementType } from '../../generated/prisma/enums';

export class CreateStockTransactionDto {
  @ApiProperty({ description: 'ID of the product', example: 1 })
  @IsInt({ message: 'Product ID must be an integer' })
  @IsNotEmpty({ message: 'Product ID is required' })
  @Type(() => Number)
  product_id: number;

  @ApiProperty({ description: 'Type of transaction', enum: StockMovementType, example: StockMovementType.IN })
  @IsNotEmpty({ message: 'Type is required' })
  @IsOptional()
  type: StockMovementType;

  @ApiProperty({ description: 'Reason for transaction', enum: StockReason, example: StockReason.RESTOCK })
  @IsNotEmpty({ message: 'Reason is required' })
  @IsOptional()
  reason: StockReason;

  @ApiProperty({ description: 'Quantity of the product', example: 50 })
  @IsInt({ message: 'Quantity must be an integer' })
  @IsNotEmpty({ message: 'Quantity is required' })
  @Type(() => Number)
  quantity: number;

  @ApiProperty({ description: 'Additional notes', example: 'Monthly restock', required: false })
  @IsNotEmpty({ message: 'Reason is required' })
  @IsOptional()
  notes: string;

}
