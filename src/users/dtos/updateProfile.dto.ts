import { IsOptional, IsString } from "class-validator";

export class UpdateProfileDto {
    @IsOptional()
    @IsString()
     name?: string;
  
    @IsOptional()
    @IsString()
    email?: string;
  
    @IsOptional()
    @IsString()
    address?: string;
  
    @IsOptional()
    @IsString()
    phone?: string;
} 