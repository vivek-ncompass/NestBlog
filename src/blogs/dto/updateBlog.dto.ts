import { IsString } from "class-validator"

export class UpdateBlogDto{
  @IsString()
  blog_name:string

  @IsString()
  desc:string

  @IsString()
  header:string

  @IsString()
  body:string

  @IsString()
  footer:string
}