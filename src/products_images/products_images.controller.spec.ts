import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { ProductsImagesController } from './products_images.controller';
import { ProductsImagesService } from './products_images.service';
import { ProductsImages } from './entities/products_images.entity';

describe('ProductsImagesController', () => {
  let controller: ProductsImagesController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ProductsImagesController],
      providers: [ProductsImagesService, { provide: getRepositoryToken(ProductsImages), useValue: {} }],
    }).compile();

    controller = module.get<ProductsImagesController>(ProductsImagesController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
