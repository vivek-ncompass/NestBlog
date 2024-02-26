import { IsNotEmpty, IsNumber, IsString } from "class-validator"

export class ResetPassDto{
  @IsNumber()
  @IsNotEmpty()
  otp:number

  @IsString()
  @IsNotEmpty()
  username:string

  @IsString()
  @IsNotEmpty()
  password:string

  @IsString()
  @IsNotEmpty()
  confirm_password:string
}