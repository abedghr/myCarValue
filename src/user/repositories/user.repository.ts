import { Injectable } from '@nestjs/common';
import { User, UserDoc } from './entities/user.entity';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { createUserDto } from '../dtos/create.user.dto';
import { UserRepositoryInterface } from '../interfaces/user.repository.interface';

@Injectable()
export class UserRepository implements UserRepositoryInterface {
  constructor(
    @InjectModel(User.name) private readonly userModel: Model<UserDoc>,
  ) {}

  async create(user: createUserDto): Promise<UserDoc> {
    return await this.userModel.create(user);
  }

  async existsByEmail(email: string): Promise<boolean> {
    const emailExists = await this.userModel.exists({
      email: email,
    });

    return emailExists ? true : false;
  }
  
  async removeById(id: string): Promise<void> {
    await this.userModel.deleteOne({_id: id}).exec();
  }
}
