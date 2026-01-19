import { Controller, Get, Res } from '@nestjs/common';
import { Response } from 'express';
import { ReportsService } from './reports.service';
@Controller('reports')
export class ReportsController {
  constructor(private readonly reportsService: ReportsService) {}
  @Get('stock-pdf')
  async stockPdf(@Res() res: Response) {
    return this.reportsService.exportStockPdf(res);
  }
}