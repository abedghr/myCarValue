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
} from '@nestjs/common';
import { UserService } from '../services/user.service';
import { CreateUserDto } from '../dtos/create.user.dto';
import { UserDoc } from '../repositories/entities/user.entity';
import { UpdateUserDto } from '../dtos/update.user.dto';
import { Types } from 'mongoose';
import { Serialize } from 'src/common/interceptors/serialize.interceptor';
import { ResponseUserDto } from '../dtos/response.user.dto';

@Controller('auth')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Serialize(ResponseUserDto)
  @Post('signup')
  async signup(@Body() { email, ...body }: CreateUserDto): Promise<UserDoc> {
    const emailExist: boolean = await this.userService.existsByEmail(email);
    if (emailExist) {
      throw new NotFoundException({
        message: 'user.error.emailExist',
      });
    }

    const userCreated: UserDoc = await this.userService.create({
      email,
      ...body,
    });
    return userCreated;
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
  @HttpCode(204)
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
