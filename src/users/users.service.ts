import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { Users } from './entities/users.entity';
const bcrypt = require('bcrypt');

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(Users)
    private usersRepository: Repository<Users>,
  ) { }
  async create(payload: CreateUserDto): Promise<Users> {
    const user = new Users()
    const saltRounds = 10
    user.firstname = payload.firstname
    user.lastname = payload.lastname
    user.email = payload.email
    user.password = await bcrypt.hash(payload.password, saltRounds)
    user.birthdate = payload.birthdate
    user.address = payload.address
    user.phoneNumber = payload.phoneNumber
    return await this.usersRepository.save(user)
  }

  async findAll(): Promise<Users[]> {
    console.log(await this.usersRepository.find());

    return await this.usersRepository.find();
  }

  async findOne(payload: object): Promise<Users> {
    return await this.usersRepository.findOneBy(payload);
  }

  async update(id: number, payload: UpdateUserDto): Promise<Users> {
    const userToUpdate = await this.usersRepository.findOneBy({
      id: 1,
    })
    userToUpdate.firstname = payload.firstname
    userToUpdate.lastname = payload.lastname
    userToUpdate.email = payload.email
    userToUpdate.birthdate = payload.birthdate
    userToUpdate.address = payload.address
    userToUpdate.phoneNumber = payload.phoneNumber
    return await this.usersRepository.save(userToUpdate)
  }

  async remove(id: number): Promise<Users> {
    const userToRemove = await this.usersRepository.findOneBy({
      id: 1,
    })
    return await this.usersRepository.remove(userToRemove)
  }
}
