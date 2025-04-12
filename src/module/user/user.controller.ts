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
  create(@Body() data: CreateUserDto) {
    return this.userService.create(data);
  }

  @Get()
  findAll() {
    return this.userService.findAll();
  }

  @Get(':userId')  
  findOne(@Param('userId', ParseIntPipe) userId: number) {  
    return this.userService.findById(userId); 
  }

  @Put(':userId')  
  update(
    @Param('userId', ParseIntPipe) userId: number, 
    @Body() data: UpdateUserDto,
  ) {
    return this.userService.update(userId, data);  
  }

  @Delete(':userId')  
  remove(@Param('userId', ParseIntPipe) userId: number) {  
    this.userService.remove(userId);  
    return { message: `User ${userId} deleted successfully` };  
  }
}
