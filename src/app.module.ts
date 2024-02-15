import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule } from '@nestjs/config';
import { Profiles } from './users/entity/profile.entity';
import { Users } from './users/entity/users.entity';
import { Topics } from './topic/entity/topic.entity';
import { Blogs } from './blogs/entity/blogs.entity';
import { TopicModule } from './topic/topic.module';

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
    TopicModule
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
