import { CanActivate, ExecutionContext, HttpStatus } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Blogs } from "src/blogs/entity/blogs.entity";
import { Topics } from "src/topic/entity/topic.entity";
import { CustomError } from "src/utils/customError";
import { Repository } from "typeorm";

export class BlogEditorVerificationGuard implements CanActivate{
  
  constructor(@InjectRepository(Topics) private topicsRepository: Repository<Topics>,
              @InjectRepository(Blogs) private blogsRepository: Repository<Blogs>){}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    
    const request = context.switchToHttp().getRequest()
    const id = request.param.id

    try{
      const blogDetails = await this.blogsRepository.findOneOrFail({where:{id:id}})

      if(blogDetails.blog_owner != request.payload.username){
        throw new CustomError(404, {message:"Cannot update other's Blog"})
      }

      const topicDetails = await this.topicsRepository.findOneOrFail({where:{topic_name:blogDetails.topic, editors:{username:request.payload.username}}, relations:['editors']})

      if(topicDetails){
        return true
      }

      return false
    }
    catch(error){
      throw new CustomError(HttpStatus.BAD_REQUEST, {message:error.message})
    }

  }
}