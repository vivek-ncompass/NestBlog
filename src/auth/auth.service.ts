import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Users } from 'src/users/entity/users.entity';
import { Repository } from 'typeorm';
import * as md5 from 'md5';
import { CustomError } from 'src/utils/customError';
import { JwtService } from '@nestjs/jwt';
import { LoginUserTypes } from '../auth/types/loginUser.type';

@Injectable()
export class AuthService {

 constructor(
    @InjectRepository(Users) 
    private userRepository: Repository<Users>,
    private readonly jwtService: JwtService,
 ){};

 async login(loginDetails: LoginUserTypes): Promise<any> {

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
