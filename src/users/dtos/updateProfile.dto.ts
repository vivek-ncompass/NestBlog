import { IsEmail, IsOptional, IsPhoneNumber, IsString } from "class-validator";

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
    @IsPhoneNumber()
    phone?: bigint;
} 