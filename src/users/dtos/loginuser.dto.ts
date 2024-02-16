import { IsString } from 'class-validator';
import { UsersController} from '../users.controller';

export class LoginUserDto{
    @IsString()
    username: string;
    
    @IsString()
    password: string;
}
