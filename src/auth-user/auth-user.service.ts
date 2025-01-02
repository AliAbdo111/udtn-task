import { BadRequestException, Injectable } from '@nestjs/common';
import { CreateAuthUserDto } from './dto/create-auth-user.dto';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './entities/user.entity';
import { LoginDto } from './dto/login-dto';

@Injectable()
export class AuthUserService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
    private readonly jwtService: JwtService,
  ) {}

  async register(createUserDto: CreateAuthUserDto): Promise<User> {
    const { email, password, role } = createUserDto;
    const hashedPassword = await bcrypt.hash(password, 10);
    return this.userRepository.save({ email, password: hashedPassword, role });
  }

  async login(loginPayload: LoginDto): Promise<any> {
    const { email, password } = loginPayload;
    const user = await this.userRepository.findOne({ where: { email } });
    if (!user) throw new BadRequestException('Invalid credentials');

    if (user && (await bcrypt.compare(password, user.password))) {
      const payload = { email: user.email, sub: user.id, role: user.role };
      return { access_token: this.jwtService.sign(payload) };
    }

    throw new BadRequestException('Invalid credentials');
  }
}
