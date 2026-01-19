import { Injectable } from '@nestjs/common';
import { CreateStockTransactionDto } from './dto/create-stock-transaction.dto';
import { UpdateStockTransactionDto } from './dto/update-stock-transaction.dto';
import { PrismaService } from '../prisma/prisma.service';
import { StockReason, StockMovementType } from '../../generated/prisma/enums';

@Injectable()
export class StockTransactionsService {
  constructor(private prisma: PrismaService) {
  }
  async create(createStockTransactionDto: CreateStockTransactionDto) {
    const { product_id, quantity, type, reason, notes } = createStockTransactionDto;

    return this.prisma.$transaction(async (prisma) => {

      const transaction = await prisma.stock_transactions.create({
        data: {
          product_id,
          quantity,
          type,
          reason,
          notes,
        },
      });


      const operation =
        type === StockMovementType.IN
          ? { increment: quantity }
          : { decrement: quantity };

      await prisma.products.update({
        where: {
          id: product_id,
        },
        data: {
          stock: operation,
        },
      });

      return {
        message: 'Stock transaction created successfully',
        stockTransaction: transaction,
      };
    });
  }

  async findAll() {
    const findAllStockTransaction = await this.prisma.stock_transactions.findMany()
    return {
      data: findAllStockTransaction,
      message: 'Get all stock transaction successfully'
    }
  }

  async findOne(id: number) {
    const findStockTransactionId = await this.prisma.stock_transactions.findFirst({
      where: {
        id: id,
      }
    })
    if (!findStockTransactionId) {
      throw new Error('Stock transaction not found')
    }
    return {
      data: findStockTransactionId,
      message: 'Get stock transaction successfully'
    }
  }

  async update(id: number, updateStockTransactionDto: UpdateStockTransactionDto) {
    const findStockTransactionId = await this.prisma.stock_transactions.findUnique({
      where: {
        id: id,
      }
    })
    if (!findStockTransactionId) {
      throw new Error('Stock transaction not found')
    }
    const updateData = await this.prisma.stock_transactions.update({
      where: {
        id: id,
      },
      data: updateStockTransactionDto
    })
    return {
      message: 'Update stock transaction successfully',
      stockTransaction: updateData
    }
  }

  async remove(id: number) {
    const findId = await this.prisma.stock_transactions.findFirst({
      where: {
        id: id,
      }
    })
    if (!findId) {
      throw new Error('Stock transaction not found')
    }
    const deleteStockTransaction = await this.prisma.stock_transactions.delete({
      where: {
        id: id,
      }
    })
    return {
      message: 'Delete stock transaction successfully',
      data: deleteStockTransaction
    }
  }
}
