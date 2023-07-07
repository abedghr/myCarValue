import {
  Body,
  Controller,
  Post,
  Get,
  NotFoundException,
  Param,
  Query,
} from '@nestjs/common';
import { UserService } from '../services/user.service';
import { createUserDto } from '../dtos/create.user.dto';
import { UserDoc } from '../repositories/entities/user.entity';

@Controller('auth')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post('signup')
  async signup(@Body() { email, ...body }: createUserDto): Promise<UserDoc> {
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

  @Get('remove')
  async remove(@Query() id: string): Promise<void> {    
    await this.userService.remove(id);
    return;
  }
}
