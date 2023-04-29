import { Test, TestingModule } from '@nestjs/testing';
import { ProductsImagesService } from './products_images.service';
import { ProductsImages } from './entities/products_images.entity';
import { getRepositoryToken } from '@nestjs/typeorm';

describe('ProductsImagesService', () => {
  let service: ProductsImagesService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ProductsImagesService, { provide: getRepositoryToken(ProductsImages), useValue: {} }],
    }).compile();

    service = module.get<ProductsImagesService>(ProductsImagesService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
