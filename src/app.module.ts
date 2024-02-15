import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule } from '@nestjs/config';
import { Profiles } from './users/entity/profile.entity';
import { Users } from './users/entity/users.entity';
import { Topics } from './topic/entity/topic.entity';
import { Blogs } from './blogs/entity/blogs.entity';

@Module({
  imports: [
    ConfigModule.forRoot({isGlobal: true}),
    TypeOrmModule.forRoot({
      type:"mysql",
      host:process.env.HOST,
      port:+process.env.PORT,
      username:process.env.USER,
      password:process.env.PASSWORD,
      database:process.env.DATABASE,
      entities:[Users, Profiles, Topics, Blogs],
      synchronize:true
    }),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
