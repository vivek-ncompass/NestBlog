import { IsArray, IsOptional, IsString } from "class-validator"

export class UpdateTopicDto{
  @IsOptional()
  @IsString()
  desc?:string

  @IsOptional()
  @IsArray()
  @IsString({each:true})
  editors?:string[]

  @IsOptional()
  @IsArray()
  @IsString({each:true})
  viewers?:string[]

}