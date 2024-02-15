import { Injectable } from '@nestjs/common';
import { LoginUserType } from 'src/auth/type/loginUser.type';
import { CustomError } from 'src/utils/customError';
import { InjectRepository } from '@nestjs/typeorm';
import * as md5 from 'md5';
import { JwtService } from '@nestjs/jwt';
import { Repository } from 'typeorm';
import { Users } from 'src/users/entity/users.entity';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(Users) private userRepository: Repository<Users>,
    private readonly jwtService: JwtService,
  ) {}
  async login(loginDetails: LoginUserType): Promise<any> {
    const { username, password } = loginDetails;
    const user = await this.userRepository.findOne({
      where: { username, password: md5(password) },
    });
    if (user) {
      const payload = {
        username: user.username,
        level: user.level,
      };

      return this.jwtService.sign(payload);
    } else {
      throw new CustomError(400, { message: 'Invalid username or password' });
    }
  }
}
