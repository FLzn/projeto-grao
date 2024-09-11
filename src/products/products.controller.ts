import { Controller, Get, Query, UseGuards } from '@nestjs/common';
import { ProductType } from 'src/enums/product-type.enum';
import { ProductsService } from './products.service';
import { ProductEntity } from './entities/product.entity';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';

@Controller('products')
export class ProductsController {
  constructor(private readonly productsService: ProductsService) { }

  @Get()
  @UseGuards(JwtAuthGuard)
  async getFilteredProducts(
    @Query('type') type?: ProductType
  ): Promise<ProductEntity[]> {
    return this.productsService.getFilteredProducts(type);
  }
}
