import { HttpStatus, Injectable } from '@nestjs/common';
import { CreateTopicParams } from './types/createTopic.types';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Users } from 'src/users/entity/users.entity';
import { CustomError } from 'src/utils/customError';
import { Topics } from './entity/topic.entity';

@Injectable()
export class TopicService {
  constructor(
    @InjectRepository(Users) private usersRepository: Repository<Users>,
    @InjectRepository(Topics) private topicsRepository: Repository<Topics>,
  ) {}

  findUserData(user) {
    return this.usersRepository.findOne({ where: { username: user } });
  }

  async createTopic(level, createTopicParams: CreateTopicParams) {
    if (level <= 2) {
      throw new CustomError(HttpStatus.BAD_REQUEST, {
        message: 'Cannot create topic as you dont have the permission to do so',
      });
    } else {
      const editorsDataArr: any =
        createTopicParams.editors.length > 0
          ? createTopicParams.editors.map(async (user) => {
              this.findUserData(user);
            })
          : null;

      const viewersDataArr: any =
        createTopicParams.viewers.length > 0
          ? createTopicParams.viewers.map(async (user) => {
              this.findUserData(user);
            })
          : null;

      const createTopicData = this.topicsRepository.create({
        topic_name: createTopicParams.topic_name,
        desc: createTopicParams.desc,
        topic_owner: createTopicParams.topic_owner,
        editors: editorsDataArr,
        viewers: viewersDataArr,
        blogs: null,
      });

      return this.topicsRepository.save(createTopicData);
    }
  }
}
