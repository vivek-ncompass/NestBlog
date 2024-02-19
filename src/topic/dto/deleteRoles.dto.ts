import { IsArray, IsNotEmpty, IsNumber, IsString } from "class-validator";

export class DeleteRolesDto{

  // This is a list of userids to delete
  @IsNotEmpty()
  @IsArray()
  @IsString({each: true})
  userArr:string[]

  @IsNotEmpty()
  @IsString()
  role:string
}