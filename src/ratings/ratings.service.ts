import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateRatingDto } from './dto/create-rating.dto';
import { UpdateRatingDto } from './dto/update-rating.dto';
import { Ratings } from './entities/rating.entity';

@Injectable()
export class RatingsService {
  constructor(
    @InjectRepository(Ratings)
    private ratingsRepository: Repository<Ratings>,
  ) {}

  async create(payload: CreateRatingDto): Promise<Ratings> {
    const rating = new Ratings()
    rating.rating = payload.rating
    rating.product = payload.productId
    rating.user = payload.userId
    return await this.ratingsRepository.save(rating);
  }

  async findAll(): Promise<Ratings[]> {
    return await this.ratingsRepository.find();
  }

  async findOne(id: object): Promise<Ratings> {
    return await this.ratingsRepository.findOneBy(id);
  }

  async update(id: number, payload: UpdateRatingDto): Promise<Ratings> {
    const ratingToUpdate = await this.ratingsRepository.findOneBy({ id })
    ratingToUpdate.rating = payload.rating
    ratingToUpdate.product = payload.productId
    ratingToUpdate.user = payload.userId
    return await this.ratingsRepository.save(ratingToUpdate);
  }

  async remove(id: number): Promise<Ratings> {
    const ratingToRemove = await this.ratingsRepository.findOneBy({ id })
    return await this.ratingsRepository.remove(ratingToRemove)
  }
}
