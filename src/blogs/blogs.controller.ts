import { Body, Controller, Param, ParseIntPipe, Patch, Post, Request, Res } from '@nestjs/common';
import { BlogsService } from './blogs.service';
import { CreateBlogDto } from './dto/createBlog.dto';
import { ApiResponse } from 'src/utils/response';
import { UpdateBlogDto } from './dto/updateBlog.dto';

@Controller("blogs")
export class BlogsController {
  constructor(private blogsService : BlogsService) {}

  @Post()
  createBlog(@Body() createBlogDto:CreateBlogDto, @Res() response: Response, @Request() request){
    const createBlogData = this.blogsService.createBlog({...createBlogDto, blog_owner: request.payload.username})
    new ApiResponse(response, 200, {messgae: "Blog Created"})
  }

  @Patch(":id")
  updateBlog(@Param('id',ParseIntPipe) id:number, @Body() updateBlogDto: UpdateBlogDto, @Res() response:Response){
    const updateBlogData = this.blogsService.updateBlog(id,updateBlogDto)
    new ApiResponse(response, 200, {message:"User Updated Successfully"})
  }
}
