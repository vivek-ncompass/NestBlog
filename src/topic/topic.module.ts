import { Module } from '@nestjs/common';
import { TopicController } from './topic.controller';
import { TopicService } from './topic.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Topics } from './entity/topic.entity';
import { Users } from 'src/users/entity/users.entity';
import { JwtModule } from '@nestjs/jwt';
import { ConfigModule } from '@nestjs/config';


@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    TypeOrmModule.forFeature([Users, Topics]),
    JwtModule.register({
      secret: process.env.JWT_KEY,
    }),
  ],
  controllers: [TopicController],
  providers: [TopicService],
})
export class TopicModule {}
