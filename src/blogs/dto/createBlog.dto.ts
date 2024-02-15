import { IsNotEmpty, IsString } from "class-validator"

export class CreateBlogDto {

  @IsString()
  @IsNotEmpty()
  blog_name:string

  @IsString()
  @IsNotEmpty()
  desc: string

  @IsString()
  @IsNotEmpty()
  header:string

  @IsString()
  @IsNotEmpty()
  body:string

  @IsString()
  @IsNotEmpty()
  footer:string

  @IsString()
  @IsNotEmpty()
  topic:string
}