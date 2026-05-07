import { Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './users.entity';

@Injectable()
export class UsersService {
  constructor(@InjectRepository(User) private repo: Repository<User>) {}

  create(eamil: string, password: string) {
    const user = this.repo.create({ email: eamil, password: password });

    return this.repo.save(user);
  }
}
