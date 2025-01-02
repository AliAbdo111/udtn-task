import { Test, TestingModule } from '@nestjs/testing';
import { AuthUserService } from './auth-user.service';
import { JwtService } from '@nestjs/jwt';
import { User } from './entities/user.entity';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

describe('AuthUserService', () => {
  let service: AuthUserService;
  let jwtService: JwtService;
  let userRepository: Repository<User>;

  const mockUserRepository = {
    findOne: jest.fn(),
    save: jest.fn(),
  };

  const mockJwtService = {
    sign: jest.fn(),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        AuthUserService,
        {
          provide: getRepositoryToken(User),
          useValue: mockUserRepository,
        },
        {
          provide: JwtService,
          useValue: mockJwtService,
        },
      ],
    }).compile();

    service = module.get<AuthUserService>(AuthUserService);
    jwtService = module.get<JwtService>(JwtService);
    userRepository = module.get<Repository<User>>(getRepositoryToken(User));
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('login', () => {
    it('should return a user if validation is successful', async () => {
      const mockUser = {
        id: 1,
        email: 'email12@example.com',
        password: 'Password2@@A',
      };
      mockUserRepository.findOne.mockResolvedValue(mockUser);

      const result = await service.login('email12@example.com', 'Password2@@A');
      expect(result).toEqual(mockUser);
      expect(mockUserRepository.findOne).toHaveBeenCalledWith({
        where: { email: 'test@example.com' },
      });
    });

    it('should return null if validation fails', async () => {
      mockUserRepository.findOne.mockResolvedValue(null);

      const result = await service.validateUser(
        'test@example.com',
        'wrongPassword',
      );
      expect(result).toBeNull();
    });
  });

  describe('login', () => {
    it('should return an access token for a valid user', async () => {
      const mockUser = { id: 1, email: 'test@example.com', role: 'admin' };
      const mockToken = 'access-token';
      mockJwtService.sign.mockReturnValue(mockToken);

      const result = await service.login(mockUser);
      expect(result).toEqual({ access_token: mockToken });
      expect(mockJwtService.sign).toHaveBeenCalledWith({
        email: mockUser.email,
        sub: mockUser.id,
        role: mockUser.role,
      });
    });
  });
});
