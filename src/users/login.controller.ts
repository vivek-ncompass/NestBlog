import { Body, Controller, Post } from "@nestjs/common";
import { LoginService } from "./login.service";
import { LoginUserDto } from "./loginuser.dto";

@Controller('login')
export class LoginController{
    constructor(private readonly loginService: LoginService ){}
    @Post()
    loginUser(@Body() loginUserDto : LoginUserDto){
        this.loginService.login(loginUserDto);
    }
    
    }
