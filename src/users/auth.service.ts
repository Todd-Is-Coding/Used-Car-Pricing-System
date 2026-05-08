import {randomBytes , scrypt as _scrypt} from "node:crypto";
import {promisify} from "node:util";
import {BadRequestException, Injectable} from '@nestjs/common';
import {UsersService} from './users.service';

const scrypt = promisify(_scrypt);

@Injectable()
export class AuthService {
    constructor(private readonly usersService: UsersService) {}

    async signUp(email : string , password : string){
        const users = await this.usersService.find(email)

        if(users.length){
            throw new BadRequestException('Email already in use');
        }
        const salt = randomBytes(32).toString('hex')
        const hash = (await scrypt(password,salt,32)) as Buffer;
        const result = salt + '.' + hash.toString('hex');

        const user = await this.usersService.create(email , result);

        return user;

    }


    signIn(email : string , password : string){

    }

}