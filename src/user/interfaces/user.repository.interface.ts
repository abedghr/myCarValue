import { CreateUserDto } from '../dtos/create.user.dto';
import { UserDoc } from '../repositories/entities/user.entity';

export interface UserRepositoryInterface {
  create(user: CreateUserDto): Promise<UserDoc>;
}