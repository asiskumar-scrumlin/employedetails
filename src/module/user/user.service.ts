import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { User } from './entities/user.entity';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
  ) {}

  async create(data: CreateUserDto): Promise<User> {
    const newUser = this.userRepository.create(data);
    return await this.userRepository.save(newUser);
  }

  async findAll(): Promise<User[]> {
    return await this.userRepository.find();
  }

  async findById(userId: number): Promise<User> {
    const user = await this.userRepository.findOneBy({ id: userId });
    if (!user) {
      throw new NotFoundException(`User with ID ${userId} not found`);
    }
    return user;
  }

  async update(userId: number, data: UpdateUserDto): Promise<User> {
    const user = await this.findById(userId);
    const updatedUser = this.userRepository.merge(user, data);
    return await this.userRepository.save(updatedUser);
  }

  async remove(userId: number): Promise<void> {
    const result = await this.userRepository.delete(userId);
    if (result.affected === 0) {
      throw new NotFoundException(`User with ID ${userId} not found`);
    }
  }
}
