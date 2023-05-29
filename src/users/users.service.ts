import { HttpException, HttpStatus, Injectable } from "@nestjs/common";
import { CreateUserDto } from "./dto/create-user.dto";
import { UpdateUserDto } from "./dto/update-user.dto";
import { Repository } from "typeorm";
import { User } from "./entities/users.entity";
import { InjectRepository } from "@nestjs/typeorm";
import { AuthService } from "../auth/auth.service";

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User) // inject for use repo
    private usersRepository: Repository<User>,
    private authService: AuthService
  ) {
  }

  async create(createUserDto: CreateUserDto) {
    const isExits = await this.emailExits(createUserDto.email);
    if (!isExits)
      throw new HttpException('Email is exits', HttpStatus.CONFLICT)
    createUserDto.password = await this.authService.hashPassword(createUserDto.password);
    const newUser = this.usersRepository.create(createUserDto);
    return this.usersRepository.save(newUser);
  }

  async findAllUser(): Promise<User[]> {
    await this.authService.comparePassword('Admin@123', '')
    return this.usersRepository.find();
  }

  async findById(id: number) {
    const user = await this.usersRepository.findOne({ where: { id } });
    if (!user)
      throw new HttpException("User not found", HttpStatus.NOT_FOUND);
    return user
  }

  async updateUser(id: number, updateUserDto: UpdateUserDto) {
    const user = await this.findById(id);
    const data = Object.assign(user, updateUserDto);
    console.log(data);
    await this.usersRepository.save(data);
    return `This action updates a #${id} user`;
  }

  async removeUser(id: number) {
    await this.findById(id);
    return this.usersRepository.delete(id);
  }

  validatePassword(pass: string, storePassword: string) {
    return this.authService.comparePassword(pass, storePassword);
  }

  async emailExits (email: string) {
    const isUser = await this.usersRepository.findOne({ where: { email } });
    return !!isUser;
  }

  async findByEmail(email: string) {
    const isUser = await this.usersRepository.findOne({ where: { email } });
    if (!isUser)
      throw new HttpException("User not found", HttpStatus.NOT_FOUND);
    return isUser
  }

  async findByLogin(email: string) {
    return await this.findByEmail(email)
  }
}
