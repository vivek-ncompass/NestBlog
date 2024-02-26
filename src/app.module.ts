import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule } from '@nestjs/config';
import { APP_FILTER } from '@nestjs/core';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersModule } from './users/users.module';
import { Profiles } from './users/entity/profile.entity';
import { Users } from './users/entity/users.entity';
import { Topics } from './topic/entity/topic.entity';
import { Blogs } from './blogs/entity/blogs.entity';
import { TopicModule } from './topic/topic.module';
import { BlogsModule } from './blogs/blogs.module';
import { AuthModule } from './auth/auth.module';
import { GlobalExceptionFilter } from './utils/globalErrorHandler';
import { OTP } from './auth/entity/otp.entity';

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
      entities:[Users, Profiles, Topics, Blogs, OTP],
      synchronize:true
    }),
    TypeOrmModule.forFeature([OTP]),
    UsersModule,TopicModule, BlogsModule, AuthModule
  ],
  controllers: [AppController],
  providers: [
    AppService,
    {provide:APP_FILTER, useClass: GlobalExceptionFilter}
  ],
})
export class AppModule {}
