import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
} from '@nestjs/common';
import { ProductsService } from './products.service';

@Controller('products')
export class ProductsController {
  constructor(private readonly productsService: ProductsService) {}

  @Post()
  async addProduct(
    @Body('title') prodTitle: string,
    @Body('desc') prodDescription: string,
    @Body('price') prodPrice: number,
  ): Promise<{ id: string }> {
    const prodId = await this.productsService.addProduct(
      prodTitle,
      prodDescription,
      prodPrice,
    );
    return { id: prodId };
  }

  @Get()
  async getAllProducts() {
    return await this.productsService.getProducts();
  }

  @Get(':prodId')
  async getProduct(@Param('prodId') prodId: string) {
    return await this.productsService.getSingleProduct(prodId);
  }

  @Patch(':prodId')
  async updateProduct(
    @Param('prodId') prodId: string,
    @Body() prodData: { title: string; description: string; price: number },
  ) {
    return await this.productsService.updateProduct(prodId, prodData);
  }

  @Delete(':prodId')
  async deleteProduct(@Param('prodId') prodId: string) {
    return await this.productsService.deleteProduct(prodId);
  }
}
