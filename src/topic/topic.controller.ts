import { Body, Controller, HttpStatus, Post, Request, Res, UseGuards } from '@nestjs/common';
import { TopicService } from './topic.service';
import { TopicDtoParams } from './dto/createTopic.dto';
import { Response } from 'express';
import { ApiResponse } from 'src/utils/response';
import { TokenVerificationGuard } from 'src/auth/guard/tokenVerification.guard';
import { CustomError } from 'src/utils/customError';

@Controller("topic")
export class TopicController {
  constructor(private topicService: TopicService) {}

  @UseGuards(TokenVerificationGuard)
  @Post()
  async createTopic(@Body() topicDtoParams: TopicDtoParams, @Res() response: Response, @Request() request) {
    try{
      const dataToPass = {topic_name: topicDtoParams.topic_name, desc: topicDtoParams.desc, editors: topicDtoParams.editors, viewers: topicDtoParams.viewers, topic_owner: request.payload.username}

      const createdTopic = await this.topicService.createTopic(request.payload.level, dataToPass)

      new ApiResponse(response, 200, { message: "Topic Created Successfully" })
    }
    catch(error){
      throw new CustomError(HttpStatus.BAD_GATEWAY, {message:"Something Went Wrong"})
    }
  }

  
}
