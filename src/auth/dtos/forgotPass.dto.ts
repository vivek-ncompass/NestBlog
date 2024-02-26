import { IsNotEmpty, IsString } from "class-validator";

export class ForgotPassDto{
  
  @IsString()
  @IsNotEmpty()
  username:string

}