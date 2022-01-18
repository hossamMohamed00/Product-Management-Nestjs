import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
} from '@nestjs/common';
import { Product } from './products.model';
import { ProductsService } from './products.service';

@Controller('products')
export class ProductsController {
  constructor(private readonly productsService: ProductsService) {}

  @Post()
  addProduct(
    @Body('title') prodTitle: string,
    @Body('desc') prodDescription: string,
    @Body('price') prodPrice: number,
  ): { prodId: string } {
    const prodId = this.productsService.addProduct(
      prodTitle,
      prodDescription,
      prodPrice,
    );
    return { prodId };
  }

  @Get()
  getAllProducts() {
    return this.productsService.getProducts();
  }

  @Get(':prodId')
  getProduct(@Param('prodId') prodId: string): Product {
    return this.productsService.getSingleProduct(prodId);
  }

  @Patch(':prodId')
  updateProduct(
    @Param('prodId') prodId: string,
    @Body() prodData: { title: string; desc: string; price: number },
  ) {
    this.productsService.updateProduct(prodId, prodData);
    return { message: 'Product updated.💃🏻💃🏻 ' };
  }

  @Delete(':prodId')
  deleteProduct(@Param('prodId') prodId: string) {
    this.productsService.deleteProduct(prodId);

    return { message: 'Product deleted successfully 💃🏻' };
  }
}
