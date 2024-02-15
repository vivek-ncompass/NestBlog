import { Body, Controller, Post } from '@nestjs/common';
import { TopicService } from './topic.service';
import { TopicDtoParams } from './dto/createTopic.dto';

@Controller()
export class TopicController {
  constructor(private topicService : TopicService) {}

  @Post()
  createTopic(@Body() topicDtoParams : TopicDtoParams){

  }
}
