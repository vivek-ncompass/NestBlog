import { IsEmail, IsEnum, IsNotEmpty, IsNumber, IsPhoneNumber, IsString  } from 'class-validator';

enum Gender {
    FEMALE = 'female',
    MALE = 'male',
}

export class CreateUserDto{

    @IsString() 
    @IsNotEmpty()
    username: string;
    
    @IsString() 
    @IsNotEmpty()
    password: string

    @IsString() 
    @IsNotEmpty()
    address: string

    @IsEmail() 
    @IsNotEmpty()
    email: string

    @IsPhoneNumber()
    @IsNotEmpty() 
    phoneNo: string

    @IsString() 
    @IsNotEmpty()  
    @IsEnum(Gender)
    gender: Gender

}