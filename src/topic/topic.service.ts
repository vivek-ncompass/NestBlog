import { HttpStatus, Injectable } from '@nestjs/common';
import { CreateTopicParams } from './types/createTopic.types';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Users } from 'src/users/entity/users.entity';
import { CustomError } from 'src/utils/customError';
import { Topics } from './entity/topic.entity';
import { UpdateTopicParams } from './types/updateTopic.types';
import { DeleteRoleParams } from './types/deleteRoles.types';

@Injectable()
export class TopicService {
  constructor(
    @InjectRepository(Users) private usersRepository: Repository<Users>,
    @InjectRepository(Topics) private topicsRepository: Repository<Topics>,
  ) {}

  async findUserByUsername(user) {
    return await this.usersRepository.findOne({ where: { username: user } });
  }

  async createTopic(level, createTopicParams: CreateTopicParams) {
    if (level <= 2) {
      throw new CustomError(HttpStatus.BAD_REQUEST, {
        message: 'Cannot create topic as you dont have the permission to do so',
      });
    } else {
      
      let editorsDataArr = [null], viewersDataArr = [null]

      for(let i = 0; i<createTopicParams.editors.length; i++){
        editorsDataArr.push(await this.findUserByUsername(createTopicParams.editors[i]))
      }
      
      for(let i = 0; i<createTopicParams.viewers.length; i++){
        viewersDataArr.push(await this.findUserByUsername(createTopicParams.viewers[i]))
      }

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

  async updateTopic(id:number, updateTopicParams: UpdateTopicParams){
    const topicData = await this.topicsRepository.findOne({where:{id:id}})
    if(!topicData){
      throw new CustomError(404, {message:"Topic Not Found"})
    }

    topicData.desc = updateTopicParams.desc

    let newEditorsArr:Users[] = [], newViewersArr:Users[] = []

    for(let i = 0; i< updateTopicParams.editors.length; i++){
      newEditorsArr.push(await this.findUserByUsername(updateTopicParams.editors[i]))
    }
    newEditorsArr.length>0?topicData.editors.push(...newEditorsArr):null
    
    for(let i = 0; i<updateTopicParams.viewers.length; i++){
      newViewersArr.push(await this.findUserByUsername(updateTopicParams.viewers[i]))
    }
    newViewersArr.length>0?topicData.editors.push(...newViewersArr):null

    topicData.updated_at = new Date()

    return this.topicsRepository.save(topicData)

  }

  async deleteRole(id:number, deleteRolesParams: DeleteRoleParams){
    const topicData = await this.topicsRepository.findOne({where: {id:id},relations:[deleteRolesParams.role]})

    let newRoleArr = []
    console.log(topicData[deleteRolesParams.role])
    for(let i = 0; i<topicData[deleteRolesParams.role].length; i++){
      const role = topicData[deleteRolesParams.role][i]
      if(!deleteRolesParams.evList.includes(role.username)){
        newRoleArr.push(role)
      }
    }

    topicData.editors = newRoleArr
    topicData.updated_at = new Date()

    return this.topicsRepository.save(topicData)
  }

  async viewTopics(){
    const topicData = await this.topicsRepository.find({select:['topic_name', 'desc', 'topic_owner']})
    return topicData
  }
}
