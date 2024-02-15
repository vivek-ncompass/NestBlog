import { CanActivate, ExecutionContext, HttpStatus } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Topics } from "src/topic/entity/topic.entity";
import { CustomError } from "src/utils/customError";
import { Repository } from "typeorm";

export class BlogCreatorVerificationGuard implements CanActivate{
  
  constructor(@InjectRepository(Topics) private topicsRepository: Repository<Topics>){}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    
    const request = context.switchToHttp().getRequest()
    const response = context.switchToHttp().getResponse()
    const body = request.body

    try{
      const topicDetails = await this.topicsRepository.findOne({where: {topic_name:body.topic}, relations:["users"]})

      const editors = topicDetails.editors

      for(let i = 0; i<editors.length; i++){
        if(editors[i].username === response.payload.username){
          return true
      }
    }
    }
    catch(error){
      throw new CustomError(HttpStatus.BAD_REQUEST, {message:error.message})
    }

  }
}

