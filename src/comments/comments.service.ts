import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateCommentDto } from './dto/create-comment.dto';
import { UpdateCommentDto } from './dto/update-comment.dto';
import { Comments } from './entities/comment.entity';

@Injectable()
export class CommentsService {
  constructor(
    @InjectRepository(Comments)
    private commentsRepository: Repository<Comments>,
  ) {}

  async create(payload: CreateCommentDto): Promise<Comments> {
    const comment = new Comments()
    comment.comment = payload.comment
    comment.product = payload.productId
    comment.user = payload.userId
    return await this.commentsRepository.save(comment);
  }

  async findAll(): Promise<Comments[]> {
    return await this.commentsRepository.find();
  }

  async findOne(id: object): Promise<Comments> {
    return await this.commentsRepository.findOneBy(id);
  }

  async update(id: number, payload: UpdateCommentDto): Promise<Comments> {
    const commentToUpdate = await this.commentsRepository.findOneBy({ id })
    commentToUpdate.comment = payload.comment
    commentToUpdate.product = payload.productId
    commentToUpdate.user = payload.userId
    return await this.commentsRepository.save(commentToUpdate);
  }

  async remove(id: number): Promise<Comments> {
    const commentToRemove = await this.commentsRepository.findOneBy({ id })
    return await this.commentsRepository.remove(commentToRemove)
  }
}
