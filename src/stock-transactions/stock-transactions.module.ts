import { Module } from '@nestjs/common';
import { StockTransactionsService } from './stock-transactions.service';
import { StockTransactionsController } from './stock-transactions.controller';
import { PrismaModule } from '../prisma/prisma.module';

@Module({
  imports: [PrismaModule],
  controllers: [StockTransactionsController],
  providers: [StockTransactionsService],
})
export class StockTransactionsModule {}
