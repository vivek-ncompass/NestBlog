import { HttpStatus, Injectable, NotFoundException } from '@nestjs/common';
import { QueryFailedError, Repository } from 'typeorm';
import { Users } from './entity/users.entity';
import { InjectRepository } from '@nestjs/typeorm';
import * as md5 from 'md5';
import { CreateUserTypes } from './types/createUser.type';
import { UpdateProfileType } from './types/updateProfile.type';
import { Profiles } from './entity/profile.entity';
import { CustomError } from 'src/utils/customError';

@Injectable()
export class UsersService {

   constructor(
    @InjectRepository(Users) private userRepository: Repository<Users>,
    @InjectRepository(Profiles) private profileRepository: Repository<Profiles>
    ){}
  

  async registerUser(userDetails: CreateUserTypes) {
    try {
      const { username, password, address, email, phoneNo, gender, level } =
        userDetails;

      const userProfileData = { username, address, email, phoneNo, gender };
      const userProfile = this.profileRepository.create(userProfileData);
      const savedUserProfile = await this.profileRepository.save(userProfile);

      const userCredentials = { username, password: md5(password), level};
      const user = this.userRepository.create(userCredentials);
      user.profile = savedUserProfile;
      const savedUser = await this.userRepository.save(user);
      return savedUser;
    } 
    catch (error) {
      if (error instanceof QueryFailedError)
        throw new CustomError(HttpStatus.BAD_REQUEST, {
          message: 'Username already exists',
        });
    }
    throw new Error('Failed to register User');
  }

  async updateProfile(id: number, updateProfile:UpdateProfileType){
    try{
      const profile = await this.profileRepository.findOne({where:{id}});
      if(!profile){
        throw new NotFoundException('Unable to find Profile');
      }
      Object.assign(profile, updateProfile);
      profile.updatedAt = new Date();
      await this.profileRepository.save(profile);
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
