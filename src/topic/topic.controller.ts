import { Body, Controller, Delete, Get, HttpStatus, Param, ParseIntPipe, Patch, Post, Request, Res, UseGuards } from '@nestjs/common';
import { TopicService } from './topic.service';
import { TopicDtoParams } from './dto/createTopic.dto';
import { Response } from 'express';
import { ApiResponse } from 'src/utils/response';
import { TokenVerificationGuard } from 'src/auth/guard/tokenVerification.guard';
import { CustomError } from 'src/utils/customError';
import { TopicUpdateGuard } from 'src/auth/guard/topicUpdate.guard';
import { UpdateTopicDto } from './dto/updateTopic.dto';
import { DeleteRolesDto } from './dto/deleteRoles.dto';

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

  @UseGuards(TokenVerificationGuard, TopicUpdateGuard)
  @Patch(":id")
  async updateTopic(@Param("id",ParseIntPipe) id:number, @Body() updateTopicDto : UpdateTopicDto, @Res() response: Response){
    try{

      if(!updateTopicDto.editors){
        updateTopicDto.editors = []
      }

      if(!updateTopicDto.viewers){
        updateTopicDto.viewers = []
      }

      const updatedTopicData = await this.topicService.updateTopic(id, updateTopicDto)
      new ApiResponse(response, 200, {message:"Topic Updated Successfully"})
    }
    catch(error){
      throw new CustomError(HttpStatus.BAD_GATEWAY, {message:error.message})
    }
    
  }

  @UseGuards(TokenVerificationGuard, TopicUpdateGuard)
  @Delete("/role/:id")
  async deleteRoles(@Param("id",ParseIntPipe) id:number,@Body() deleteRolesDto: DeleteRolesDto, @Res() response: Response){
    try{
      const updatedTopicData = await this.topicService.deleteRole(id, deleteRolesDto)
      new ApiResponse(response, 200, {message:"Editor or Viewers updated Successfully"})
    }
    catch(error){
      throw new CustomError(HttpStatus.BAD_REQUEST, {message:error.message})
    }
  }

  @UseGuards(TokenVerificationGuard)
  @Get()
  async viewTopics(@Res() response: Response){
    const topicDetails = await this.topicService.viewTopics()
    new ApiResponse(response, 200, {message:"Data fetched", topics: topicDetails})
  }
  
}
