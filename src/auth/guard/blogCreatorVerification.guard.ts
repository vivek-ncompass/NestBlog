import { CanActivate, ExecutionContext, HttpStatus } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Topics } from "src/topic/entity/topic.entity";
import { CustomError } from "src/utils/customError";
import { Repository } from "typeorm";

export class BlogCreatorVerificationGuard implements CanActivate{
  
  constructor(@InjectRepository(Topics) private topicsRepository: Repository<Topics>){}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest()
    const body = request.body
    
    try{
      const topicDetails = await this.topicsRepository.findOneOrFail({ relations:["editors"], where: {topic_name:body.topic, editors:{username:request.payload.username}}})

      if(topicDetails){
        return true
      }
    }
    catch(error){
      throw new CustomError(HttpStatus.BAD_REQUEST, {message:error.message})
    }

  }
}

