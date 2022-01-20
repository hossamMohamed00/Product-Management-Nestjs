import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
} from '@nestjs/common';
import {
  ApiBody,
  ApiCreatedResponse,
  ApiNotFoundResponse,
  ApiOkResponse,
  ApiOperation,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';
import { ProductsService } from './products.service';

@ApiTags('Products')
@Controller('products')
export class ProductsController {
  constructor(private readonly productsService: ProductsService) {}

  @Post()
  @ApiOperation({ summary: 'Add new product' })
  @ApiCreatedResponse({ description: 'Product added successfully' })
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
  @ApiOperation({ summary: 'Fetch all products' })
  @ApiOkResponse({ description: 'All products returned successfully' })
  async getAllProducts() {
    return await this.productsService.getProducts();
  }

  @Get(':prodId')
  @ApiOperation({ summary: 'Fetch single products' })
  @ApiOkResponse({ description: 'Product returned successfully' })
  @ApiNotFoundResponse({ description: 'Product not found' })
  async getProduct(@Param('prodId') prodId: string) {
    return await this.productsService.getSingleProduct(prodId);
  }

  @Patch(':prodId')
  @ApiOperation({ summary: 'Update product' })
  @ApiOkResponse({ description: 'Product updated successfully' })
  @ApiNotFoundResponse({ description: 'Product not found' })
  async updateProduct(
    @Param('prodId') prodId: string,
    @Body() prodData: { title: string; description: string; price: number },
  ) {
    return await this.productsService.updateProduct(prodId, prodData);
  }

  @Delete(':prodId')
  @ApiOperation({ summary: 'Delete product' })
  @ApiOkResponse({ description: 'Product delete successfully' })
  @ApiNotFoundResponse({ description: 'Product not found' })
  async deleteProduct(@Param('prodId') prodId: string) {
    return await this.productsService.deleteProduct(prodId);
  }
}
