import { IsEmail, IsNumber, IsOptional, IsPhoneNumber, IsString } from "class-validator";

export class UpdateProfileDto {
    @IsOptional()
    @IsString()
    name?: string;
  
    @IsOptional()
    @IsEmail()
    email?: string;
  
    @IsOptional()
    @IsString()
    address?: string;
  
    @IsOptional()
    @IsNumber()
    phone?: number;
 
} 