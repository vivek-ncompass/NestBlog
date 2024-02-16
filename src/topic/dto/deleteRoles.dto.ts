import { IsArray, IsString } from "class-validator";

export class DeleteRolesDto{
  @IsArray()
  @IsString({each:true})
  evList:string[]

  @IsString()
  role:string
}