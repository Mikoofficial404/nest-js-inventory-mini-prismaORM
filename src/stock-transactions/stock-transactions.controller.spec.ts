import { Test, TestingModule } from '@nestjs/testing';
import { StockTransactionsController } from './stock-transactions.controller';
import { StockTransactionsService } from './stock-transactions.service';

describe('StockTransactionsController', () => {
  let controller: StockTransactionsController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [StockTransactionsController],
      providers: [StockTransactionsService],
    }).compile();

    controller = module.get<StockTransactionsController>(StockTransactionsController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
