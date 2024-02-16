import { Body, Controller, Get, HttpStatus, Param, ParseIntPipe, Patch, Post, Request, Res, UseGuards } from '@nestjs/common';
import { BlogsService } from './blogs.service';
import { CreateBlogDto } from './dto/createBlog.dto';
import { ApiResponse } from 'src/utils/response';
import { UpdateBlogDto } from './dto/updateBlog.dto';
import { TokenVerificationGuard } from 'src/auth/guard/tokenVerification.guard';
import { BlogCreatorVerificationGuard } from 'src/auth/guard/blogCreatorVerification.guard';
import { BlogEditorVerificationGuard } from 'src/auth/guard/blogEditorVerification.guard';
import { CustomError } from 'src/utils/customError';
import { ViewBlogVerificaiton } from 'src/auth/guard/viewBlog.guard';

@Controller("blogs")
export class BlogsController {
  constructor(private blogsService : BlogsService) {}


  @UseGuards(TokenVerificationGuard, BlogCreatorVerificationGuard)
  @Post()
  async createBlog(@Body() createBlogDto:CreateBlogDto, @Res() response: Response, @Request() request){
    try{
      const createBlogData = await this.blogsService.createBlog({...createBlogDto, blog_owner: request.payload.username})
      new ApiResponse(response, 200, {messgae: "Blog Created"})
    }
    catch(error){
      throw new CustomError(HttpStatus.BAD_GATEWAY, {message:error.message})
    }
  }


  @UseGuards(TokenVerificationGuard, BlogEditorVerificationGuard)
  @Patch(":id")
  updateBlog(@Param('id',ParseIntPipe) id:number, @Body() updateBlogDto: UpdateBlogDto, @Res() response:Response){
    try{
      const updateBlogData = this.blogsService.updateBlog(id,updateBlogDto)
      new ApiResponse(response, 200, {message:"Blog Updated Successfully"})
    }
    catch(error){
      throw new CustomError(HttpStatus.BAD_GATEWAY, {message:error.message})
    }
  }

  @UseGuards(TokenVerificationGuard, ViewBlogVerificaiton)
  @Get(":id")
  async viewBlog(@Param("id", ParseIntPipe) id:number, @Res() response:Response){
    try{
      const blogDetails = await this.blogsService.viewSpecificBlog(id)
      new ApiResponse(response, 200, {message:"Blog fetched", blog:blogDetails})
    }
    catch(error){
      throw new CustomError(HttpStatus.BAD_REQUEST, {message:error.message})
    }
  }
}
