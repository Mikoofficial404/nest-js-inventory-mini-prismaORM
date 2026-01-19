import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { PrismaModule } from './prisma/prisma.module';
import { AuthModule } from './auth/auth.module';
import { ProductsModule } from './products/products.module';
import { CategoriesModule } from './categories/categories.module';
import { SupplierModule } from './supplier/supplier.module';
import { StockTransactionsModule } from './stock-transactions/stock-transactions.module';
import { ReportsModule } from './reports/reports.module';
import { DashboardModule } from './dashboard/dashboard.module';
import { ServeStaticModule } from '@nestjs/serve-static';
import { join } from 'path';

@Module({
  imports: [PrismaModule, AuthModule, ProductsModule, CategoriesModule, SupplierModule, StockTransactionsModule, ReportsModule, DashboardModule, ServeStaticModule.forRoot({
    rootPath: join(__dirname, '..', 'public'),
  })],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule { }
