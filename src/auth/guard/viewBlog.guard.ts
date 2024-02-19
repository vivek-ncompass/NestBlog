import { CanActivate, ExecutionContext, Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Blogs } from "src/blogs/entity/blogs.entity";
import { Repository } from "typeorm";

@Injectable()
export class ViewBlogVerificaiton implements CanActivate{
  constructor(
    @InjectRepository(Blogs) private blogsRepository: Repository<Blogs>
  ){}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest();
    if(request.payload.level >2){
      return true
    }
 
    const topicDetails = await this.blogsRepository.findOne({where:{id:request.param.id}, relations:["topic_rel","topic_rel.editors","topic_rel.viewers"]})

    const listToCheck = [...topicDetails.topic_rel.editors, ...topicDetails.topic_rel.viewers]

    for(let i = 0; i<listToCheck.length; i++){
      if(listToCheck[i].username === request.payload.username){
        return true
      }
    }

    return false
  }
}