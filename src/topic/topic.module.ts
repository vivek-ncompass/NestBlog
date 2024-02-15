import { Module } from '@nestjs/common';
import { TopicController } from './topic.controller';
import { TopicService } from './topic.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Topics } from './entity/topic.entity';
import { Users } from 'src/users/entity/users.entity';


@Module({
  imports: [
    TypeOrmModule.forFeature([Users, Topics])
  ],
  controllers: [TopicController],
  providers: [TopicService],
})
export class TopicModule {}
