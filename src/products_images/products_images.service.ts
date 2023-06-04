import { Inject, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, In } from 'typeorm';
import { CreateProductsImagesDto } from './dto/create-products_images.dto';
import { UpdateProductsImagesDto } from './dto/update-products_images.dto';
import { ProductsImages } from './entities/products_images.entity';

@Injectable()
export class ProductsImagesService {
  constructor(
    @InjectRepository(ProductsImages)
    private productsImagesRepository: Repository<ProductsImages>
  ) { }

  async create(payload: CreateProductsImagesDto): Promise<ProductsImages> {
    const productsImages = new ProductsImages
    productsImages.url = payload.url
    productsImages.product = payload.productId
    return await this.productsImagesRepository.save(productsImages)
  }

  async findAll(): Promise<ProductsImages[]> {
    return await this.productsImagesRepository.find();
  }

  async findOne(id: object): Promise<ProductsImages> {
    return await this.productsImagesRepository.findOneBy(id);
  }

  async update(id: number, payload: UpdateProductsImagesDto): Promise<ProductsImages> {
    const productsImagesToUpdate = await this.productsImagesRepository.findOneBy({ id })
    productsImagesToUpdate.url = payload.url
    productsImagesToUpdate.product = payload.productId
    return await this.productsImagesRepository.save(productsImagesToUpdate)
  }

  async remove(id: number): Promise<ProductsImages> {
    const productsImagesToRemove = await this.productsImagesRepository.findOneBy({ id })
    return await this.productsImagesRepository.remove(productsImagesToRemove)
  }
}
