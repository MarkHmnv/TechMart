import {Controller, Get, Param} from '@nestjs/common';
import { ProductService } from '../service/product.service';
import {ProductDocument} from "../model/product.model";

@Controller("api/v1/products")
export class ProductController {
  constructor(private readonly appService: ProductService) {}

  @Get()
  getAllProducts(): Promise<ProductDocument[]> {
    return this.appService.getAllProducts();
  }

  @Get("/:id")
  getProduct(@Param("id") id: string): Promise<ProductDocument> {
    return this.appService.getProduct(id);
  }
}
