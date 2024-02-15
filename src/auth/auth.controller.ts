import {
  Body,
  Controller,
  Post,
  Res,
  UnauthorizedException,
} from '@nestjs/common';
import { LoginUserDto } from 'src/users/dtos/loginuser.dto';
import { ApiResponse } from 'src/utils/response';
import { AuthService } from './auth.service';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}
  @Post('login')
  async login(@Body() loginUserDto: LoginUserDto, @Res() response: Response) {
    try {
      const token = await this.authService.login(loginUserDto);
      return new ApiResponse(response, 200, { token });
    } catch (error) {
      if (error instanceof UnauthorizedException) {
        return new ApiResponse(response, 401, {
          message: 'Invalid username or password',
        });
      } else {
        return new ApiResponse(response, 500, { message: 'Failed to login' });
      }
    }
  }
}
