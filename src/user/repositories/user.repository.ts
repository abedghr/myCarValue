import { Injectable } from '@nestjs/common';
import { User, UserDoc } from './entities/user.entity';
import { Model, Types } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { CreateUserDto } from '../dtos/create.user.dto';
import { UserRepositoryInterface } from '../interfaces/user.repository.interface';

@Injectable()
export class UserRepository implements UserRepositoryInterface {
  constructor(
    @InjectModel(User.name) private readonly userModel: Model<UserDoc>,
  ) {}

  async create(user: CreateUserDto): Promise<UserDoc> {
    return await this.userModel.create(user);
  }

  async existsByEmail(email: string): Promise<boolean> {
    const emailExists = await this.userModel.exists({
      email: email,
    });

    return emailExists ? true : false;
  }

  async findById(id: string): Promise<UserDoc> {
    const objectId = new Types.ObjectId(id);
    return await this.userModel.findById(objectId);
  }

  async findOne(find: Object): Promise<UserDoc> {
    return await this.userModel.findOne(find);
  }

  async updateOne(
    filter: Object,
    body: Object,
    returnNewDocument: boolean = true,
  ): Promise<UserDoc> {
    return await this.userModel
      .findOneAndUpdate(filter, body, { new: returnNewDocument })
      .exec();
  }

  async removeById(id: string): Promise<void> {
    await this.userModel.deleteOne({ _id: id }).exec();
  }
}
