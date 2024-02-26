import { CanActivate, ExecutionContext, HttpStatus } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Topics } from "src/topic/entity/topic.entity";
import { CustomError } from "src/utils/customError";
import { Repository } from "typeorm";

export class TopicUpdateGuard implements CanActivate{

  constructor(
    @InjectRepository(Topics) private topicsRepository: Repository<Topics>
  ){}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest()

    try{
      const topicData = await this.topicsRepository.findOneOrFail({where:{id:request.param.id}})

      if(topicData.topic_owner !== request.payload.username || request.payload.level !== 4){
        throw new CustomError(HttpStatus.UNAUTHORIZED,{message:"You are not authorized to perform the operation"})
      }

      return true
    }
    catch(error){
      throw new CustomError(HttpStatus.BAD_REQUEST,{message:error.message})
    }
  }
}