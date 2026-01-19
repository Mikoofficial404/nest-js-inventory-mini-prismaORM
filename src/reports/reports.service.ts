import { Injectable } from '@nestjs/common';
import { Response } from 'express';
import PDFDocument from 'pdfkit';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class ReportsService {
  constructor(private prisma: PrismaService) {
  }
  async exportStockPdf(res: Response) {
    const doc = new PDFDocument({ size: 'A4', margin: 50 });


    res.setHeader('Content-Type', 'application/pdf');
    res.setHeader(
      'Content-Disposition',
      'attachment; filename=stock-report.pdf',
    );

    doc.pipe(res);
    doc.fontSize(18).text('Stock Report', { align: 'center' });
    doc.moveDown();
    doc.fontSize(12).text(`Generated: ${new Date().toLocaleString()}`);
    doc.moveDown();

    const products = await this.prisma.products.findMany({
      select: {
        id: true,
        name_product: true,
        stock: true,
        price: true,
        min_stock: true,
        image: true,
      },
    });

    const tableTop = 150;
    const itemX = 50;
    const nameX = 100;
    const priceX = 300;
    const stockX = 400;
    const minX = 480;

    doc.font('Helvetica-Bold');

    // Draw Header
    generateTableRow(
      doc,
      doc.y,
      'ID',
      'Product Name',
      'Price',
      'Stock',
      'Min'
    );

    generateHr(doc, doc.y + 20);
    doc.moveDown();
    doc.font('Helvetica');

    let i = 0;
    products.forEach((p) => {
      const position = doc.y;
      if (position > 750) {
        doc.addPage();

      }
      generateTableRow(
        doc,
        position,
        String(p.id),
        p.name_product,
        formatCurrency(Number(p.price)),
        String(p.stock),
        String(p.min_stock)
      );

      generateHr(doc, position + 20);
      doc.y = position + 30;
      i++;
    });

    doc.end();
  }
}

function generateTableRow(
  doc: any,
  y: number,
  id: string,
  name: string,
  price: string,
  stock: string,
  min: string,
) {
  doc
    .fontSize(10)
    .text(id, 50, y)
    .text(name, 100, y, { width: 180, lineBreak: false, ellipsis: true })
    .text(price, 300, y, { width: 90, align: 'right' })
    .text(stock, 400, y, { width: 50, align: 'center' })
    .text(min, 480, y, { width: 50, align: 'center' });
}

function generateHr(doc: any, y: number) {
  doc
    .strokeColor('#aaaaaa')
    .lineWidth(1)
    .moveTo(50, y)
    .lineTo(550, y)
    .stroke();
}

function formatCurrency(amount: number) {
  return "Rp " + amount.toFixed(0).replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1.');
}
