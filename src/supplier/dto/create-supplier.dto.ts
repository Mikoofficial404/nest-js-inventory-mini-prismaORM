import { IsNotEmpty, IsOptional, IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateSupplierDto {

  @ApiProperty({ description: 'Name of the supplier', example: 'Samsung' })
  @IsString()
  @IsNotEmpty()
  name: string;

  @ApiProperty({ description: 'Email of the supplier', example: 'contact@samsung.com', required: false })
  @IsString()
  @IsOptional()
  email: string;

  @ApiProperty({ description: 'Phone number of the supplier', example: '+1234567890', required: false })
  @IsString()
  @IsOptional()
  phone: string;


  @ApiProperty({ description: 'Address of the supplier', example: '123 Tech Street', required: false })
  @IsString()
  @IsOptional()
  address: string;

  @ApiProperty({ description: 'Description or notes about the supplier', example: 'Electronics supplier', required: false })
  @IsString()
  @IsOptional()
  descriptors: string;

}
