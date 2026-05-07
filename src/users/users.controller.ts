import { Body, Controller, Param, Post, Get } from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dtos/craete-user.dto';

@Controller('auth')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Post('/signup')
  createUser(@Body() user: CreateUserDto) {
    this.usersService.create(user.email, user.password);
  }

  @Get('/:id')
  findUserById(@Param('id') id: number) {
    this.usersService.findOne(id);
  }

  @Get()
  findUserByEmail(@Body('email') email: string) {
    this.usersService.find(email);
  }
}
