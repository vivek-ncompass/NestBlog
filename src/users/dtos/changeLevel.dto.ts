import { IsNotEmpty, IsNumber, IsString } from "class-validator"

export class ChangeLevelDto{
  @IsString()
  @IsNotEmpty()
  username:string

  @IsNumber()
  @IsNotEmpty()
  level:number
}