import { ConflictException, Injectable, NotFoundException } from '@nestjs/common';
import { CreateUserDto } from './dtos/createUser.dto';
import { QueryFailedError, Repository } from 'typeorm';
import { Users } from './entity/users.entity';
import { InjectRepository } from '@nestjs/typeorm';
import * as md5 from 'md5';
import { ApiResponse } from 'src/utils/response';
import { CustomError } from 'src/utils/customError';
import { CreateUserTypes } from './types/createUser.type';
import { Profiles } from './entity/profile.entity';
import { UpdateProfileType } from './types/updateProfile.type';

@Injectable()
export class UsersService {

   constructor(
    @InjectRepository(Users) private userRepository: Repository<Users>,
    @InjectRepository(Profiles) private readonly profileRepository: Repository<Profiles>) {}
   
    async registerUser(userDetails : CreateUserTypes){
      try{
        const hashedPw = md5(userDetails.password);

        const res1 = this.userRepository.create({
          username: userDetails.username,
          password: hashedPw,
          level: userDetails.level
        })

        const ans = await this.userRepository.save(res1)
        return ans
      }

      catch(error){
        if(error instanceof QueryFailedError && error.message.includes('duplicate key value')){
            throw new ConflictException('Username already exists')
        }
        else{
        throw new Error('Failed to register User');
      }
    }

  }

  async updateProfile(id: number, updateProfile:UpdateProfileType){
    try{
      const profile = await this.profileRepository.findOne({where:{id}});
      if(!profile){
        throw new NotFoundException('Unable to find Profile');
      }
      Object.assign(profile, updateProfile);
      return profile;
    } catch (error) {
      if (error instanceof NotFoundException) {
        throw new NotFoundException('Profile not found');
      } else {
        throw new Error('Failed to update profile');
      }
    }
      }
      
  }     
    

