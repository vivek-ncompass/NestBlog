import { Module } from '@nestjs/common';
import { BlogsController } from './blogs.controller';
import { BlogsService } from './blogs.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Blogs } from './entity/blogs.entity';
import { Users } from 'src/users/entity/users.entity';
import { Topics } from 'src/topic/entity/topic.entity';
import { JwtService } from '@nestjs/jwt';
import { JwtModule } from '@nestjs/jwt';
import { ConfigModule } from '@nestjs/config';


@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    TypeOrmModule.forFeature([Blogs, Users, Topics]),
    JwtModule.register({
      secret: process.env.JWT_KEY,
    }),
  ],
  controllers: [BlogsController],
  providers: [BlogsService]
})
export class BlogsModule {}
