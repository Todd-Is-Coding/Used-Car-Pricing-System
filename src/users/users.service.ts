import { Injectable, NotFoundException } from '@nestjs/common';
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

  findOne(id: number) {
    const user = this.repo.findOneBy({ id });

    return user;
  }

  find(email: string) {
    const user = this.repo.findBy({ email });

    return user;
  }

  async update(id: number, attrs: Partial<User>) {
    const user = await this.findOne(id);

    if (!user) {
      throw new NotFoundException('No user has been found');
    }

    Object.assign(user, attrs);
    return this.repo.save(user);
  }

  async remove(id: number) {
    const user = await this.findOne(id);
    if (!user) {
      throw new NotFoundException('No user has been found');
    }
    return this.repo.remove(user);
  }
}
