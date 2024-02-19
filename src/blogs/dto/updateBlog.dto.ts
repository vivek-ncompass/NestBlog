import { IsOptional, IsString } from "class-validator"

export class UpdateBlogDto{
  @IsOptional()
  @IsString()
  desc:string

  @IsOptional()
  @IsString()
  header:string

  @IsOptional()
  @IsString()
  body:string

  @IsOptional()
  @IsString()
  footer:string
}