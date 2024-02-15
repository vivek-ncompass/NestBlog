import { Injectable } from '@nestjs/common';
import * as md5 from 'md5';
import * as jwt from 'jsonwebtoken';
import { UsersService } from './users.service'; 
import { LoginUserDto } from './loginuser.dto';
import { ApiResponse } from 'src/utils/response';
import { CustomError } from 'src/utils/customError';

@Injectable()
export class LoginService {
  constructor(private readonly usersService: UsersService) {}

  async login(loginDetails: LoginUserDto): Promise<any> {
    const { username, password } = loginDetails;
    const user = await this.usersService.findUserByUsername(username);
    if (user && user.password === md5(password)) {
      const payload = {
        username: user.username,
        level: user.level,
      };
      const token = jwt.sign(payload, process.env.JWT_KEY, { expiresIn: '48h' });
      return new ApiResponse(token);
    } else {
      throw new CustomError(400, { message: 'Invalid username or password' });
    }
  }
}

