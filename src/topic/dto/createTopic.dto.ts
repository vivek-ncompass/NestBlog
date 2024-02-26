import { IsArray, IsNotEmpty, IsString } from "class-validator"

export class TopicDtoParams{
  
  @IsString()
  @IsNotEmpty()
  topic_name:string

  @IsString()
  @IsNotEmpty()
  desc: string

  @IsArray()
  @IsString({each:true})
  editors: string[]
  
  @IsArray()
  @IsString({each:true})
  viewers: string[]
}