import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { Products } from './entities/products.entity';

@Injectable()
export class ProductsService {
  constructor(
    @InjectRepository(Products)
    private productsRepository: Repository<Products>,
  ) { }

  async create(payload: CreateProductDto): Promise<Products> {
    const product = new Products()
    product.title = payload.title
    product.brand = payload.brand
    product.price = payload.price
    product.description = payload.description
    product.stock = payload.stock
    return await this.productsRepository.save(product)
  }

  async findAll(): Promise<Products[]> {
    return await this.productsRepository.find();
  }

  async findOne(payload: object): Promise<Products> {
    return await this.productsRepository.findOneBy(payload);
  }

  async update(id: number, payload: UpdateProductDto): Promise<Products> {
    const productToUpdate = await this.productsRepository.findOneBy({
      id: 1,
    })
    productToUpdate.title = payload.title
    productToUpdate.brand = payload.brand
    productToUpdate.price = payload.price
    productToUpdate.description = payload.description
    productToUpdate.stock = payload.stock
    return await this.productsRepository.save(productToUpdate);
  }

  async remove(id: number): Promise<Products> {
    const productToRemove = await this.productsRepository.findOneBy({
      id: 1,
    })
    return await this.productsRepository.remove(productToRemove)
  }
}
