import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersModule } from './users/users.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule } from '@nestjs/config';
import { Profiles } from './users/entity/profile.entity';
import { Users } from './users/entity/users.entity';
import { Topics } from './topic/entity/topic.entity';
import { Blogs } from './blogs/entity/blogs.entity';
import { TopicModule } from './topic/topic.module';
import { BlogsModule } from './blogs/blogs.module';
import { AuthModule } from './auth/auth.module';
import { APP_FILTER } from '@nestjs/core';
import { GlobalExceptionFilter } from './utils/globalErrorHandler';

@Module({
  imports: [ 
    ConfigModule.forRoot({isGlobal: true}),
    TypeOrmModule.forRoot({
      type:"mysql",
      host:process.env.MYSQL_HOST,
      port:+process.env.MYSQL_PORT,
      username:process.env.MYSQL_USER,
      password:process.env.MYSQL_PASSWORD,
      database:process.env.MYSQL_DATABASE,
      entities:[Users, Profiles, Topics, Blogs],
      synchronize:true
    }),
    UsersModule,TopicModule, BlogsModule, AuthModule
  ],
  controllers: [AppController],
  providers: [
    AppService,
    {provide:APP_FILTER, useClass: GlobalExceptionFilter}
  ],
})
export class AppModule {}
