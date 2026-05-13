import { Test } from '@nestjs/testing';

import { AuthService } from './auth.service';
import { UsersService } from './users.service';

describe('AuthService', () => {
  it('can create an instance of auth service', async () => {
    const fakeUserService = {
      find: () => Promise.resolve([]),
      create: (password: string, email: string) =>
        Promise.resolve({ id: 1, email, password }),
    };

    const module = await Test.createTestingModule({
      providers: [
        AuthService,
        {
          provide: UsersService,
          useValue: fakeUserService,
        },
      ],
    }).compile();

    const service = module.get(AuthService);

    expect(service).toBeDefined();
  });
});
