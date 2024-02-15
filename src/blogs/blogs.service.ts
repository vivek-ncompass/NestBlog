import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Blogs } from './entity/blogs.entity';
import { CreateBlogParams } from './types/createBlog.type';
import { Topics } from 'src/topic/entity/topic.entity';
import { CustomError } from 'src/utils/customError';
import { UpdateBlogParams } from './types/updateBlog.type';

@Injectable()
export class BlogsService {
  constructor(
    @InjectRepository(Blogs) private blogsRepository: Repository<Blogs>,
    @InjectRepository(Topics) private topicsRepository: Repository<Topics>,
  ) {}

  async createBlog(createBlogParams : CreateBlogParams){
    const topicDetails = await this.topicsRepository.findOne({where:{topic_name:createBlogParams.topic}, relations:["blogs"]})
    
    const blogDetails = this.blogsRepository.create(createBlogParams)
    blogDetails.topic_rel = topicDetails
    
    return await this.blogsRepository.save(blogDetails)
  }

  async updateBlog(id :number, updateBlogParams :UpdateBlogParams){
    
    let updateInfo = {}

    const blogDetails = await this.blogsRepository.findOne({where:{id:id}})

    for(let i in updateBlogParams){
      if(updateBlogParams[i].length !== 0){
        blogDetails[updateInfo[i]] = updateBlogParams[i]
      }
    }

    return this.blogsRepository.save(blogDetails)
  }
}
