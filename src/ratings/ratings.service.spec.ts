import { Test, TestingModule } from '@nestjs/testing';
import { RatingsService } from './ratings.service';
import { Ratings } from './entities/rating.entity';
import { getRepositoryToken } from '@nestjs/typeorm';

describe('RatingsService', () => {
  let service: RatingsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [RatingsService, { provide: getRepositoryToken(Ratings), useValue: {} }],
    }).compile();

    service = module.get<RatingsService>(RatingsService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
