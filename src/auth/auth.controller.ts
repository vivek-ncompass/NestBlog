import { Body, Controller, Param, ParseIntPipe, Patch, Post } from '@nestjs/common';
import { TokenVerificationGuard } from './guard/tokenVerification.guard'
import { UserLoginDto } from './dtos/UserLoginDto.dto';
import { AuthService } from './auth.service';
import { UpdateUserDto } from './dtos/UpdateUserDto.dto';

@Controller('auth')
export class AuthController {

    constructor(private readonly authService: AuthService) {};

    @Post('login')
    async login(@Body() userLoginDto : UserLoginDto){
        return this.authService.loginUser(userLoginDto)
        
    }


    @Post('/upgrade')
    async updateUser(@Body() updateUserDto : UpdateUserDto) {
        return this.authService.updateUser(updateUserDto);
    }
    
}
