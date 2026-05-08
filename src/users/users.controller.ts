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
    Session,
    UseInterceptors
} from '@nestjs/common';
import {UsersService} from './users.service';
import {AuthService} from './auth.service';
import {CreateUserDto} from './dtos/craete-user.dto';
import {UpdateUserDTO} from './dtos/update-user.dto';
import {Serialize} from '../interceptors/serialize.interceptor';
import {UserDTO} from './dtos/user.dto';
import {CurrentUser} from "./decorators/current-user.decorator";
import {CurrentUserInterceptor} from "./interceptors/current-user.interceptor";
import {User} from './users.entity'

@Serialize(UserDTO)
@UseInterceptors(CurrentUserInterceptor)
@Controller('auth')
export class UsersController {
    constructor(private readonly usersService: UsersService, private readonly authService: AuthService) {
    }

    @Get('/whoami')
    whoAmI(@CurrentUser() user: User) {
        return user;
    }

    @Post('/signout')
    signOut(@Session() session: any) {
        session.userId = null;
    }

    @Post('/signup')
    async createUser(@Body() body: CreateUserDto, @Session() session: any) {
        const user = await this.authService.signUp(body.email, body.password);
        session.userId = user.id;
        return user;
    }

    @Post('/signin')
    async signIn(@Body() body: CreateUserDto, @Session() session: any) {
        const user = await this.authService.signIn(body.email, body.password)
        session.userId = user.id;
        return user;
    }

    @Get('/colors/:color')
    setColor(@Param('color') color: string, @Session() session: any) {
        session.color = color;
    }

    @Get('/colors')
    getColor(@Session() session: any) {
        return session.color;
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
