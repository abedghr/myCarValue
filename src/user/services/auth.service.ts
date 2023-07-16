import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { UserDoc } from '../repositories/entities/user.entity';
import { UserService } from './user.service';
import { randomBytes, scrypt as _scrypt } from 'crypto';
import { promisify } from 'util';
import { LoginUserDto } from '../dtos/login.user.dto';
import { ExceptionHandler } from 'src/common/validations/exception.handler';
const scrypt = promisify(_scrypt);

@Injectable()
export class AuthService {
  constructor(
    private readonly exceptionHandler: ExceptionHandler,
    private readonly userService: UserService,
  ) {}

  async signup({ name, email, password }) {
    try {
      const emailExist: boolean = await this.userService.existsByEmail(email);
      if (emailExist) {
        throw new BadRequestException({
          message: 'user.error.emailExist',
        });
      }

      password = await this.createPassword(password);

      const userCreated: UserDoc = await this.userService.create({
        name,
        email,
        password,
      });

      return userCreated;
    } catch (error) {
      this.exceptionHandler.handle(error);
    }
  }

  async login({ email, password }: LoginUserDto) {
    try {
      const user = await this.userService.findOne({ email });

      if (!user) {
        throw new NotFoundException({
          message: 'user.error.notFound',
        });
      }

      const validatePassword = await this.validatePassword(
        password,
        user.password,
      );
      if (!validatePassword) {
        throw new BadRequestException({
          message: 'user.error.incorrectPassword',
        });
      }
      return user;
    } catch (error) {

      this.exceptionHandler.handle(error);
    }
  }

  async createPassword(password: string): Promise<string> {
    const salt: string = randomBytes(9).toString('hex');
    const hash: Buffer = (await scrypt(password, salt, 32)) as Buffer;
    const passwordResult = `${salt}.${hash.toString('hex')}`;
    return passwordResult;
  }

  async validatePassword(
    password: string,
    userPassword: string,
  ): Promise<boolean> {
    const [salt, storedHash] = userPassword.split('.');
    const hash = (await scrypt(password, salt, 32)) as Buffer;
    const hashResult = hash.toString('hex');
    return hashResult === storedHash;
  }
}
