import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Post,
  Put,
} from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { UserService } from './user.service';

@Controller('users')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post()
  async create(@Body() data: CreateUserDto) {
    return await this.userService.create(data);
  }

  @Get()
  async findAll() {
    return await this.userService.findAll();
  }

  @Get(':userId')
  async findOne(@Param('userId', ParseIntPipe) userId: number) {
    return await this.userService.findById(userId);
  }

  @Put(':userId')
  async update(
    @Param('userId', ParseIntPipe) userId: number,
    @Body() data: UpdateUserDto,
  ) {
    return await this.userService.update(userId, data);
  }

  @Delete(':userId')
  async remove(@Param('userId', ParseIntPipe) userId: number) {
    const result = await this.userService.remove(userId);
    return { message: `User ${userId} deleted successfully`, result };
  }
}
