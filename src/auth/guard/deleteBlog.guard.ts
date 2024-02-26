import { CanActivate, ExecutionContext, HttpStatus } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Blogs } from "src/blogs/entity/blogs.entity";
import { CustomError } from "src/utils/customError";
import { Repository } from "typeorm";

export class DeleteBlogGuard implements CanActivate{

  constructor(
    @InjectRepository(Blogs) private topicsRepository: Repository<Blogs>
  ){}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest()
    
    if(request.payload.level>2){
      return true
    }
    
    try{
      const blogData = await this.topicsRepository.findOneOrFail({where:{id:request.param.id}})
      if(request.payload.username === blogData.blog_owner){
        return true
      }
    }
    catch(error){
      throw new CustomError(HttpStatus.BAD_REQUEST, {message:error.message})
    }
    
    return false
  }
}