import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { Repository } from "typeorm";
import { User } from "./entities/users.entity";
import { InjectRepository } from "@nestjs/typeorm";

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User) // inject for use repo
    private usersRepository: Repository<User>,
  ) {
  }
  async create(createUserDto: CreateUserDto) {
    const newUser = this.usersRepository.create(createUserDto);
    console.log(newUser);
    return this.usersRepository.save(newUser);
    // return 'This action adds a new test';
  }

  async findAll(): Promise<User[]> {
    return this.usersRepository.find()
    // return `This action returns all test`;
  }

  findOne(id: number) {
    return this.usersRepository.findBy({id})
    // return `This action returns a #${id} test`;
  }

  update(id: number, updateUserDto: UpdateUserDto) {
    console.log(id);
    console.log(updateUserDto);
    return `This action updates a #${id} user`;
  }

  async remove(id: number) {
    return this.usersRepository.delete(id)
    // return `This action removes a #${id} users`;
  }
}
