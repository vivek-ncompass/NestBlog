import { CanActivate, ExecutionContext, Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Topics } from "src/topic/entity/topic.entity";
import { Repository } from "typeorm";

@Injectable()
export class ViewBlogFromTopicGuard implements CanActivate{
  constructor(
    @InjectRepository(Topics) private topicRepository: Repository<Topics>
  ){}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest();
    if(request.payload.level >2){
      return true
    }

    const topicDetails = await this.topicRepository.findOneOrFail({where:{id:request.param.id}, relations:["editors","viewers"]})

    const listToCheck = [...topicDetails.editors, ...topicDetails.viewers]
    
    for(let i = 0; i<listToCheck.length; i++){
      if(listToCheck[i].username === request.payload.username){
        return true
      }
    }

    return false
  }
}