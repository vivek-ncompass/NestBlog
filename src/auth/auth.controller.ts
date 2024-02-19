import { Body, Controller, Post, UnauthorizedException, Res, ValidationPipe } from '@nestjs/common';
import { UserLoginDto } from './dtos/UserLoginDto.dto';
import { AuthService } from './auth.service';
import { ApiResponse } from 'src/utils/response';
import { ForgotPassDto } from './dtos/forgotPass.dto';
import { ResetPassDto } from './dtos/resetPass.dto';


@Controller('auth')
export class AuthController {
  
  constructor(private readonly authService: AuthService) {};

  @Post('login')
  async login(@Body(ValidationPipe) loginUserDto: UserLoginDto, @Res() response: Response) {
    try {
      const token = await this.authService.login(loginUserDto);
      return new ApiResponse(response, 200, { token });
    } 
    catch (error) {
      if (error instanceof UnauthorizedException) {
        return new ApiResponse(response, 401, {message: 'Invalid username or password',});
      } 
      else {
        return new ApiResponse(response, 500, { message: 'Failed to login' });
      }
    }
  }

   
  @Post("forgot")
  async forgotPass(@Body(ValidationPipe) username:ForgotPassDto, @Res() response: Response){
    const savedOtp = await this.authService.forgotGenrateOtp(username)
    new ApiResponse(response, 200, {message:"Otp Generated Successfully", otp: savedOtp.otp})
  }

  @Post("reset")
  async verifyOtp(@Body(ValidationPipe) resetPassDto: ResetPassDto, @Res() response: Response){
    const passwordUpdate = await this.authService.forgotVerifyOtp(resetPassDto)
    new ApiResponse(response, 200, {message: "Password Reset Successful"})
  }
}
