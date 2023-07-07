import { BadRequestException, Injectable } from '@nestjs/common';
import { UserRepository } from '../repositories/user.repository';
import { createUserDto } from '../dtos/create.user.dto';
import { UserDoc } from '../repositories/entities/user.entity';

@Injectable()
export class UserService {
  constructor(private readonly userRepository: UserRepository) {}

  async create(user: createUserDto): Promise<UserDoc> {
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
  
  async remove(id: string): Promise<void> {
    try {
      await this.userRepository.removeById(id);
    } catch (error) {
      throw new BadRequestException(error.message);
    }
  }
}
