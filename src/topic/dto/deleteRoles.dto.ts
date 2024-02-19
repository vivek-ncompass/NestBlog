import { IsNumber, IsString } from "class-validator";

export class DeleteRolesDto{

  // This is a list of userids to delete

  @IsNumber({},{each: true})
  userArr:number[]

  @IsString()
  role:string
}