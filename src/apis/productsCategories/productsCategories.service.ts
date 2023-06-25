import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ProductCategory } from './entities/productCategory.entity';
import { Repository } from 'typeorm';
import { IProductCategoryCreate } from './interfaces/productsCategories-service.interface';

@Injectable()
export class ProductsCategoriesService {
  constructor(
    @InjectRepository(ProductCategory)
    private readonly productCategoryRepository: Repository<ProductCategory>,
  ) {}

  findAll(): Promise<ProductCategory[]> {
    return this.productCategoryRepository.find({});
  }

  create({ name }: IProductCategoryCreate): Promise<ProductCategory> {
    return this.productCategoryRepository.save({ name });
  }
}
