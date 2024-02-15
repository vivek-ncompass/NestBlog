import { IsNotEmpty, IsString } from "class-validator"

export class TopicDtoParams{
  
  @IsString()
  @IsNotEmpty()
  topic_name:string

  @IsString()
  @IsNotEmpty()
  desc: string

  @IsString()
  @IsNotEmpty()
  topic_owner: string
}