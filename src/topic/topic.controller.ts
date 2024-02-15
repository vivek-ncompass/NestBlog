import { Body, Controller, Post, Request, Res } from '@nestjs/common';
import { TopicService } from './topic.service';
import { TopicDtoParams } from './dto/createTopic.dto';
import { Response } from 'express';
import { ApiResponse } from 'src/utils/response';

@Controller("topic")
export class TopicController {
  constructor(private topicService: TopicService) {}

  @Post()
  createTopic(@Body() topicDtoParams: TopicDtoParams, @Res() response: Response, @Request() request) {

    const dataToPass = {topic_name: topicDtoParams.topic_name, desc: topicDtoParams.desc, editors: topicDtoParams.editors, viewers: topicDtoParams.viewers, topic_owner: request.payload.username}

    const createdTopic = this.topicService.createTopic(request.payload.level, dataToPass)

    new ApiResponse(response, 200, { message: "Topic Created Successfully" })
  }

  
}
