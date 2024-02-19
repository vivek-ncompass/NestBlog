import { Body, Controller, Delete, Get, HttpStatus, Param, ParseIntPipe, Patch, Post, Request, Res, UseGuards, ValidationPipe } from '@nestjs/common';
import { Response } from 'express';
import { TopicService } from './topic.service';
import { TopicDtoParams } from './dto/createTopic.dto';
import { ApiResponse } from 'src/utils/response';
import { TokenVerificationGuard } from 'src/auth/guard/tokenVerification.guard';
import { CustomError } from 'src/utils/customError';
import { TopicUpdateGuard } from 'src/auth/guard/topicUpdate.guard';
import { UpdateTopicDto } from './dto/updateTopic.dto';
import { DeleteRolesDto } from './dto/deleteRoles.dto';
import { ViewBlogFromTopicGuard } from 'src/auth/guard/viewBlogFromTopic.guard';
import { CreateTopicGuard } from 'src/auth/guard/createTopic.guard';

@Controller("topic")
export class TopicController {
  constructor(private topicService: TopicService) {}

  @UseGuards(TokenVerificationGuard, CreateTopicGuard)
  @Post()
  async createTopic(@Body(ValidationPipe) topicDtoParams: TopicDtoParams, @Res() response: Response, @Request() request) {
    try{
      const dataToPass = {topic_name: topicDtoParams.topic_name, desc: topicDtoParams.desc, editors: topicDtoParams.editors, viewers: topicDtoParams.viewers, topic_owner: request.payload.username}

      const createdTopic = await this.topicService.createTopic(dataToPass)

      new ApiResponse(response, 200, { message: "Topic Created Successfully" })
    }
    catch(error){
      throw new CustomError(HttpStatus.BAD_GATEWAY, {message:"Something Went Wrong"})
    }
  }

  @UseGuards(TokenVerificationGuard, TopicUpdateGuard)
  @Patch(":id")
  async updateTopic(@Param("id") id:string, @Body(ValidationPipe) updateTopicDto : UpdateTopicDto, @Res() response: Response){
    try{

      if(!updateTopicDto.desc){
        updateTopicDto.desc = ""
      }
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
  async deleteRoles(@Param("id") id:string, @Body(ValidationPipe) deleteRolesDto: DeleteRolesDto, @Res() response: Response){
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

  @UseGuards(TokenVerificationGuard, ViewBlogFromTopicGuard)
  @Get(":id")
  async viewBlogsFromTopic(@Param("id") id:string, @Res() response: Response){
    try{
      const blogsFromTopic = await this.topicService.viewBlogsFromTopic(id)
      new ApiResponse(response, 200, {message:"Blogs fetched Successfully", blogs: blogsFromTopic})
    }
    catch(error){
      throw new CustomError(HttpStatus.BAD_REQUEST, {message:error.message})
    }
  }
  
}
