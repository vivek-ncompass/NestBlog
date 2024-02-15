import { IsBoolean, IsDate, IsEnum, IsIn, IsNotEmpty, IsNumber, IsOptional, IsString, isNumber } from 'class-validator';
import { UserRole } from '../entity/users.entity';


export class CreateUserDto{

    @IsString()
    username: string;
    
    @IsString()
    password: string

    @IsEnum(UserRole)
    level: UserRole;

}