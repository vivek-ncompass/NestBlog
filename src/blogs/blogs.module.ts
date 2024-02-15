import { Module } from '@nestjs/common';
import { BlogsController } from './blogs.controller';
import { BlogsService } from './blogs.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Blogs } from './entity/blogs.entity';
import { Users } from 'src/users/entity/users.entity';
import { Topics } from 'src/topic/entity/topic.entity';


@Module({
  imports: [
    TypeOrmModule.forFeature([Blogs, Users, Topics])
  ],
  controllers: [BlogsController],
  providers: [BlogsService],
})
export class BlogsModule {}
