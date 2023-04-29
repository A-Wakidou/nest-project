import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateCategoryDto } from './dto/create-category.dto';
import { UpdateCategoryDto } from './dto/update-category.dto';
import { Categories } from './entities/categories.entity';

@Injectable()
export class CategoriesService {
  constructor(
    @InjectRepository(Categories)
    private categoriesRepository: Repository<Categories>,
  ) { }

  async create(payload: CreateCategoryDto): Promise<Categories> {
    const category = new Categories()
    category.name = payload.name
    return await this.categoriesRepository.save(category)
  }

  async findAll(): Promise<Categories[]> {
    return await this.categoriesRepository.find();
  }

  async findOne(id: object): Promise<Categories> {
    return await this.categoriesRepository.findOneBy(id);
  }


  async update(id: number, payload: UpdateCategoryDto): Promise<Categories> {
    const categoryToUpdate = await this.categoriesRepository.findOneBy({ id })
    categoryToUpdate.name = payload.name
    return await this.categoriesRepository.save(categoryToUpdate);
  }

  async remove(id: number): Promise<Categories> {
    const categoryToRemove = await this.categoriesRepository.findOneBy({ id })
    return await this.categoriesRepository.remove(categoryToRemove)
  }

}
