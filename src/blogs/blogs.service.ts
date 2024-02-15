import { HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Users } from 'src/users/entity/users.entity';
import { Repository } from 'typeorm';
import { Blogs } from './entity/blogs.entity';
import { CreateBlogParams } from './types/createBlog.type';
import { Topics } from 'src/topic/entity/topic.entity';
import { CustomError } from 'src/utils/customError';
import { UpdateBlogParams } from './types/updateBlog.type';

@Injectable()
export class BlogsService {
  constructor(
    @InjectRepository(Users) private usersRepository: Repository<Users>,
    @InjectRepository(Blogs) private blogsRepository: Repository<Blogs>,
    @InjectRepository(Topics) private topicsRepository: Repository<Topics>,
  ) {}

  async createBlog(createBlogParams : CreateBlogParams){
    const topicDetails = await this.topicsRepository.findOne({where: {topic_name:createBlogParams.topic}, relations:["topics"]})
    
    const editors = topicDetails.editors

    let presentAsEditor = false 
    for(let i = 0; i<editors.length; i++){
      if(editors[i].username === createBlogParams.blog_owner){
        presentAsEditor = true
        break
      }
    }

    if(!presentAsEditor){
      throw new CustomError(HttpStatus.BAD_REQUEST, {message:"The user is not a editor and cannot create a blog"})
    }

    const blogDetails = this.blogsRepository.create(createBlogParams)

    return await this.blogsRepository.save(blogDetails)

  }

  async updateBlog(id :number, updateBlogParams :UpdateBlogParams){
    
    let updateInfo = {}

    for(let i in updateBlogParams){
      if(updateBlogParams[i].length !== 0){
        updateInfo[i] = updateBlogParams[i]
      }
    }

    const updateBlogData:any = await this.blogsRepository.update({id},{...updateInfo})

    return this.blogsRepository.save(updateBlogData)
  }
}
