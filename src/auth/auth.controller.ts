import { Body, Controller, Param, ParseIntPipe, Patch, Post, Res } from '@nestjs/common';
import { TokenVerificationGuard } from './guard/tokenVerification.guard'
import { UserLoginDto } from './dtos/UserLoginDto.dto';
import { AuthService } from './auth.service';
import { UpdateUserDto } from './dtos/UpdateUserDto.dto';
import { ApiResponse } from 'src/utils/response';
import { CustomError } from 'src/utils/customError';

@Controller('auth')
export class AuthController {

    constructor(private readonly authService: AuthService) {};


    @Post('/modifyUser')
    async modifyUserAccess(@Body() updateUserDto : UpdateUserDto, @Res() response:  Response) {
        this.authService.modifyUser(updateUserDto);
        return new ApiResponse(response, 200, { message: "Level upgraded" } )
    }
    
}
