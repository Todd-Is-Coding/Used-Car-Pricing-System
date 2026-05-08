import {Injectable} from '@nestjs/common';
import {UsersService} from './users.service';

export class AuthService {
    constructor(private readonly usersService: UsersService) {}


}