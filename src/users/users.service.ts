import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { Users } from './entities/users.entity';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(Users)
    private usersRepository: Repository<Users>,
  ) {}
  async create(payload: CreateUserDto):Promise<Users[]> {
    const user = new Users()
    user.firstname = payload.firstname
    user.lastname = payload.lastname
    user.email = payload.email
    user.password = payload.password
    user.birthdate = payload.birthdate
    user.address = payload.address
    user.phoneNumber = payload.phoneNumber
    await this.usersRepository.save(user)
    return this.usersRepository.find();
  }

  findAll() {
    return this.usersRepository.find();
  }

  findOne(payload: object) {
    return this.usersRepository.findOneBy(payload);
  }

  update(id: number, updateUserDto: UpdateUserDto) {
    return `This action updates a #${id} user`;
  }

  remove(id: number) {
    return `This action removes a #${id} user`;
  }
}
