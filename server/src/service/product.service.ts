import {Injectable} from '@nestjs/common';
import {InjectModel} from "@nestjs/mongoose";
import {Product, ProductDocument} from "../model/product.model";
import {Model, Types} from "mongoose";
import {ProductNotFoundException} from "../exception/product-not-found.exception";

@Injectable()
export class ProductService {
  constructor(@InjectModel(Product.name) private productModel: Model<ProductDocument>) {}
  getAllProducts(): Promise<ProductDocument[]> {
    return this.productModel.find().exec();
  }

  async getProduct(id: string): Promise<ProductDocument> {
    if(!Types.ObjectId.isValid(id))
      throw new ProductNotFoundException();
    return await this.getProductById(id);
  }

  async getProductById(id: string): Promise<ProductDocument> {
    return await this.productModel.findById(id).exec()
        ?? (() => {throw new ProductNotFoundException()})();
  }
}
