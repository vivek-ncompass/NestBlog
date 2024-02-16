import { Body, Controller, Param, ParseIntPipe, Patch, Post, UnauthorizedException, Res } from '@nestjs/common';
import { TokenVerificationGuard } from './guard/tokenVerification.guard'
import { UserLoginDto } from './dtos/UserLoginDto.dto';
import { AuthService } from './auth.service';
// import { UpdateUserDto } from '../users/dtos/UpdateUserDto.dto';
import { ApiResponse } from 'src/utils/response';
import { CustomError } from 'src/utils/customError';


@Controller('auth')
export class AuthController {

    constructor(private readonly authService: AuthService) {};


    @Post('login')
    async login(@Body() loginUserDto: UserLoginDto, @Res() response: Response) {
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
