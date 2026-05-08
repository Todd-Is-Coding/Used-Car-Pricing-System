import {
  Body,
  Controller,
  Param,
  Query,
  Post,
  Get,
  Patch,
  Delete,
  NotFoundException,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { AuthService } from './auth.service';
import { CreateUserDto } from './dtos/craete-user.dto';
import { UpdateUserDTO } from './dtos/update-user.dto';
import { Serialize } from '../interceptors/serialize.interceptor';
import { UserDTO } from './dtos/user.dto';

@Serialize(UserDTO)
@Controller('auth')
export class UsersController {
  constructor(private readonly usersService: UsersService , private readonly authService: AuthService) {}

  @Post('/signup')
  createUser(@Body() user: CreateUserDto) {
    return this.authService.signUp(user.email, user.password);
  }

  @Post('/signin')
  signIn(@Body() user : CreateUserDto) {
    return this.authService.signIn(user.email , user.password)
  }

  @Get('/:id')
  async findUserById(@Param('id') id: string) {
    const user = await this.usersService.findOne(parseInt(id));
    if (!user) {
      throw new NotFoundException('No user has been found');
    }
    return user;
  }

  @Get()
  findAllUsers(@Query('email') email: string) {
    return this.usersService.find(email);
  }

  @Patch('/:id')
  updateUser(@Param('id') id: string, @Body() body: UpdateUserDTO) {
    return this.usersService.update(parseInt(id), body);
  }

  @Delete('/:id')
  removeUser(@Param('id') id: string) {
    return this.usersService.remove(parseInt(id));
  }
}
