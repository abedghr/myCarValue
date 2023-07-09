import { BadRequestException, Injectable } from '@nestjs/common';
import { UserRepository } from '../repositories/user.repository';
import { CreateUserDto } from '../dtos/create.user.dto';
import { UserDoc } from '../repositories/entities/user.entity';

@Injectable()
export class UserService {
  constructor(private readonly userRepository: UserRepository) {}

  async create(user: CreateUserDto): Promise<UserDoc> {
    try {
      return await this.userRepository.create(user);
    } catch (error) {
      throw new BadRequestException(error.message);
    }
  }

  async existsByEmail(email: string): Promise<boolean> {
    try {
      return await this.userRepository.existsByEmail(email);
    } catch (error) {
      throw new BadRequestException(error.message);
    }
  }

  async findById(id: string): Promise<UserDoc> {
    try {
      return await this.userRepository.findById(id);
    } catch (error) {
      throw new BadRequestException(error.message);
    }
  }

  async findOne(find: object): Promise<UserDoc> {
    try {
      return await this.userRepository.findOne(find);
    } catch (error) {
      throw new BadRequestException(error.message);
    }
  }

  async UpdateOne(filter: Object, body: Object): Promise<UserDoc> {
    try {
      return await this.userRepository.updateOne(filter, body);
    } catch (error) {
      throw new BadRequestException(error.message);
    }
  }

  async remove(id: string): Promise<void> {
    try {
      await this.userRepository.removeById(id);
    } catch (error) {
      throw new BadRequestException(error.message);
    }
  }
}
