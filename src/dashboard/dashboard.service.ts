import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class DashboardService {
    constructor(private prisma: PrismaService) { }

    async getSummary() {
        const products = await this.prisma.products.findMany({
            select: {
                id: true,
                price: true,
                stock: true,
                min_stock: true,
            },
        });
        const totalProducts = products.length;

        const totalAsset = products.reduce((sum, product) => {
            return sum + (Number(product.price) * product.stock);
        }, 0);
        const lowStockCount = products.filter(p => p.stock <= p.min_stock && p.stock > 0).length;
        const outOfStockCount = products.filter(p => p.stock === 0).length;

        return {
            message: 'Dashboard summary retrieved successfully',
            data: {
                totalProducts,
                totalAsset,
                lowStockCount,
                outOfStockCount
            }
        };
    }
}
