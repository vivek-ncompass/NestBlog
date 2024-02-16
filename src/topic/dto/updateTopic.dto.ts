import { IsArray, IsString } from "class-validator"

export class UpdateTopicDto{
  @IsString()
  desc:string

  @IsArray()
  @IsString({each:true})
  editors:string[]

  @IsArray()
  @IsString({each:true})
  viewers:string[]

}