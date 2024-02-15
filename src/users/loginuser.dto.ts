import { IsString } from 'class-validator';
import { LoginController } from './login.controller';

export class LoginUserDto{
    @IsString()
    username: string;
    @IsString()
    password: string;
}
