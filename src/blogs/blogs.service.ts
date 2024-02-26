import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Blogs } from './entity/blogs.entity';
import { CreateBlogParams } from './types/createBlog.type';
import { Topics } from 'src/topic/entity/topic.entity';
import { UpdateBlogParams } from './types/updateBlog.type';

@Injectable()
export class BlogsService {
  constructor(
    @InjectRepository(Blogs) private blogsRepository: Repository<Blogs>,
    @InjectRepository(Topics) private topicsRepository: Repository<Topics>,
  ) {}

  async createBlog(createBlogParams : CreateBlogParams){
    const topicDetails = await this.topicsRepository.findOneOrFail({where:{topic_name:createBlogParams.topic}, relations:["blogs"]})
    
    const blogDetails = this.blogsRepository.create(createBlogParams)
    blogDetails.topic_rel = topicDetails
    
    return this.blogsRepository.save(blogDetails)
  }

  async updateBlog(id :string, updateBlogParams :UpdateBlogParams){

    const blogDetails = await this.blogsRepository.findOneOrFail({where:{id:id}})

    Object.assign(blogDetails, updateBlogParams)

    blogDetails.updated_at = new Date()

    return this.blogsRepository.save(blogDetails)
  }

  async viewSpecificBlog(id:string){
    const blogDetails = await this.blogsRepository.findOneOrFail({where:{id:id}, select:["topic", "blog_name", "blog_owner", "created_at", "desc", "header", "body", "footer"]})
    return blogDetails
  }
  
  async deleteBlog(id:string){
    await this.blogsRepository.delete(id)
  }
}
