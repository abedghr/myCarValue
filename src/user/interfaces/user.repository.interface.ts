import { createUserDto } from '../dtos/create.user.dto';
import { UserDoc } from '../repositories/entities/user.entity';

export interface UserRepositoryInterface {
  create(user: createUserDto): Promise<UserDoc>;
}