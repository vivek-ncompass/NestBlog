import { Injectable } from '@nestjs/common';
import { CreateTopicParams } from './types/createTopic.types';

@Injectable()
export class TopicService {
  createTopic(request : any, createTopicParams : CreateTopicParams){
    if(request.payload.level > 2){
      
    }
  }
}
