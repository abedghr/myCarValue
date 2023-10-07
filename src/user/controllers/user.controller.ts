import {
  Body,
  Controller,
  Post,
  Get,
  NotFoundException,
  Param,
  Query,
  Delete,
  Put,
  HttpCode,
  Session,
  UseGuards,
  HttpStatus,
} from '@nestjs/common';
import { UserService } from '../services/user.service';
import { CreateUserDto } from '../dtos/create.user.dto';
import { UserDoc } from '../repositories/entities/user.entity';
import { UpdateUserDto } from '../dtos/update.user.dto';
import { Types } from 'mongoose';
import { Serialize } from 'src/common/interceptors/serialize.interceptor';
import { ResponseUserDto } from '../dtos/response.user.dto';
import { AuthService } from '../services/auth.service';
import { LoginUserDto } from '../dtos/login.user.dto';
import { ExceptionHandler } from 'src/common/validations/exception.handler';
import { LoggedInUser } from '../decorators/logged-in.user.decorator';
import { AuthGuard } from 'src/common/guards/auth.guard';

@Controller('auth')
export class UserController {
  constructor(
    private readonly exceptionHandler: ExceptionHandler,
    private readonly userService: UserService,
    private readonly authService: AuthService,
  ) {}

  @UseGuards(AuthGuard)
  @Serialize(ResponseUserDto)
  @Get('whoAmI')
  async whoami(@LoggedInUser() loggedInUser: UserDoc): Promise<UserDoc> {
    return loggedInUser;
  }

  @Serialize(ResponseUserDto)
  @Post('signup')
  async signup(
    @Body() { email, ...body }: CreateUserDto,
    @Session() session: any,
  ): Promise<UserDoc> {
    try {
      const user: UserDoc = await this.authService.signup({ email, ...body });
      session.userId = user._id;
      return user;
    } catch (error) {
      this.exceptionHandler.handle(error);
    }
  }

  @Serialize(ResponseUserDto)
  @Post('login')
  async login(
    @Body() { email, password }: LoginUserDto,
    @Session() session: any,
  ): Promise<UserDoc> {
    try {
      const user: UserDoc = await this.authService.login({ email, password });
      session.userId = user._id;
      return user;
    } catch (error) {
      this.exceptionHandler.handle(error);
    }
  }

  @Post('logout')
  logout(@Session() session: any) {
    session.userId = null;
  }

  @Serialize(ResponseUserDto)
  @Get('details/:id')
  async get(@Param('id') id: string): Promise<UserDoc> {
    const user: UserDoc = await this.userService.findById(id);
    if (!user) {
      throw new NotFoundException({
        message: 'user.error.notFound',
      });
    }

    return user;
  }

  @Serialize(ResponseUserDto)
  @Get('DetailsByEmail')
  async getByEmail(@Query() query: any): Promise<UserDoc> {
    const find = {
      email: query.email,
    };

    const user: UserDoc = await this.userService.findOne(query);

    if (!user) {
      throw new NotFoundException({
        message: 'user.error.notFound',
      });
    }

    return user;
  }

  @Delete('remove')
  @HttpCode(HttpStatus.NO_CONTENT)
  async remove(@Query('id') id: string): Promise<void> {
    await this.userService.remove(id);
    return;
  }

  @Serialize(ResponseUserDto)
  @Put('update/:id')
  async updateOne(
    @Param('id') id: string,
    @Body() body: UpdateUserDto,
  ): Promise<UserDoc> {
    const find = {
      _id: new Types.ObjectId(id),
    };

    const updatedUser = await this.userService.UpdateOne(find, body);
    if (!updatedUser) {
      throw new NotFoundException({
        message: 'user.error.notFound',
      });
    }
    return updatedUser;
  }
}
