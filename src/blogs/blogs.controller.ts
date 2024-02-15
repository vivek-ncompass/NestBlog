import { Body, Controller, Param, ParseIntPipe, Patch, Post, Request, Res, UseGuards } from '@nestjs/common';
import { BlogsService } from './blogs.service';
import { CreateBlogDto } from './dto/createBlog.dto';
import { ApiResponse } from 'src/utils/response';
import { UpdateBlogDto } from './dto/updateBlog.dto';
import { TokenVerificationGuard } from 'src/auth/guard/tokenVerification.guard';
import { BlogCreatorVerificationGuard } from 'src/auth/guard/blogCreatorVerification.guard';
import { BlogEditorVerificationGuard } from 'src/auth/guard/blogEditorVerification.guard';

@Controller("blogs")
export class BlogsController {
  constructor(private blogsService : BlogsService) {}

  @UseGuards(TokenVerificationGuard)
  @UseGuards(BlogCreatorVerificationGuard)
  @Post()
  createBlog(@Body() createBlogDto:CreateBlogDto, @Res() response: Response, @Request() request){
    const createBlogData = this.blogsService.createBlog({...createBlogDto, blog_owner: request.payload.username})
    new ApiResponse(response, 200, {messgae: "Blog Created"})
  }

  @UseGuards(TokenVerificationGuard)
  @UseGuards(BlogEditorVerificationGuard)
  @Patch(":id")
  updateBlog(@Param('id',ParseIntPipe) id:number, @Body() updateBlogDto: UpdateBlogDto, @Res() response:Response){
    const updateBlogData = this.blogsService.updateBlog(id,updateBlogDto)
    new ApiResponse(response, 200, {message:"User Updated Successfully"})
  }
}
