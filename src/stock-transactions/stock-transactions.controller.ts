import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse, ApiParam } from '@nestjs/swagger';
import { StockTransactionsService } from './stock-transactions.service';
import { CreateStockTransactionDto } from './dto/create-stock-transaction.dto';
import { UpdateStockTransactionDto } from './dto/update-stock-transaction.dto';

@ApiTags('Stock Transactions')
@Controller('stock-transactions')
export class StockTransactionsController {
  constructor(private readonly stockTransactionsService: StockTransactionsService) { }

  @Post()
  @ApiOperation({ summary: 'Create a new stock transaction' })
  @ApiResponse({ status: 201, description: 'Stock transaction successfully created.' })
  @ApiResponse({ status: 400, description: 'Bad Request.' })
  create(@Body() createStockTransactionDto: CreateStockTransactionDto) {
    return this.stockTransactionsService.create(createStockTransactionDto);
  }

  @Get()
  @ApiOperation({ summary: 'Get all stock transactions' })
  @ApiResponse({ status: 200, description: 'Return all stock transactions.' })
  findAll() {
    return this.stockTransactionsService.findAll();
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get a stock transaction by ID' })
  @ApiParam({ name: 'id', description: 'Transaction ID' })
  @ApiResponse({ status: 200, description: 'Return the transaction.' })
  @ApiResponse({ status: 404, description: 'Transaction not found.' })
  findOne(@Param('id') id: string) {
    return this.stockTransactionsService.findOne(+id);
  }

  @Patch(':id')
  @ApiOperation({ summary: 'Update a stock transaction' })
  @ApiParam({ name: 'id', description: 'Transaction ID' })
  @ApiResponse({ status: 200, description: 'Transaction successfully updated.' })
  @ApiResponse({ status: 404, description: 'Transaction not found.' })
  update(@Param('id') id: string, @Body() updateStockTransactionDto: UpdateStockTransactionDto) {
    return this.stockTransactionsService.update(+id, updateStockTransactionDto);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Delete a stock transaction' })
  @ApiParam({ name: 'id', description: 'Transaction ID' })
  @ApiResponse({ status: 200, description: 'Transaction successfully deleted.' })
  @ApiResponse({ status: 404, description: 'Transaction not found.' })
  remove(@Param('id') id: string) {
    return this.stockTransactionsService.remove(+id);
  }
}
