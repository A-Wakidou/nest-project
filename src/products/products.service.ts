import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, In } from 'typeorm';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { Products } from './entities/products.entity';
import { Categories } from '../categories/entities/categories.entity';
import { ProductsImages } from '../products_images/entities/products_images.entity';

@Injectable()
export class ProductsService {
  constructor(
    @InjectRepository(Products)
    private productsRepository: Repository<Products>,
    @InjectRepository(ProductsImages)
    private productsImagesRepository: Repository<ProductsImages>,
    @InjectRepository(Categories)
    private categoriesRepository: Repository<Categories>
  ) { }

  async create(payload: CreateProductDto): Promise<Products> {
    const product = new Products()
    product.stripeId = payload.stripeId
    product.title = payload.title
    const images = []
    payload.images.forEach(async (element) => {
      const image = new ProductsImages()
      image.url = element.url
      console.log(element);
      image.productId = element.productId
      await this.productsImagesRepository.save(image)
        .then(() => {
          images.push(image)
        })
    })
    product.images = images
    product.brand = payload.brand
    product.categories = await this.categoriesRepository.findBy({ id: In([payload.categories]) })
    product.price = payload.price
    product.description = payload.description
    product.stock = payload.stock
    return await this.productsRepository.save(product)
  }

  async findAll(): Promise<Products[]> {
    return await this.productsRepository.find();
  }

  async findOne(id: object): Promise<Products> {
    return await this.productsRepository.findOneBy(id);
  }

  async update(id: number, payload: UpdateProductDto): Promise<Products> {
    const productToUpdate = await this.productsRepository.findOneBy({ id })
    productToUpdate.stripeId = payload.stripeId
    productToUpdate.title = payload.title
    const images = []
    payload.images.forEach(async (element) => {
      const image = new ProductsImages()
      image.url = element.url
      image.productId = element.productId
      await this.productsImagesRepository.save(image)
        .then(() => {
          images.push(image)
        })
    })
    productToUpdate.images = images
    productToUpdate.brand = payload.brand
    productToUpdate.categories = payload.categories
    productToUpdate.price = payload.price
    productToUpdate.description = payload.description
    productToUpdate.stock = payload.stock
    return await this.productsRepository.save(productToUpdate)
  }

  async remove(id: number): Promise<Products> {
    const productToRemove = await this.productsRepository.findOneBy({ id })
    return await this.productsRepository.remove(productToRemove)
  }
}
