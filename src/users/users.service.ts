import { ConflictException, Injectable, NotFoundException } from '@nestjs/common';
import { CreateUserDto } from './dtos/createUser.dto';
import { QueryFailedError, Repository } from 'typeorm';
import { Users } from './entity/users.entity';
import { InjectRepository } from '@nestjs/typeorm';
import * as md5 from 'md5';
import { CreateUserTypes } from './types/createUser.type';
import { UpdateProfileType } from './types/updateProfile.type';
import { Profiles } from './entity/profile.entity';

@Injectable()
export class UsersService {

   constructor(
    @InjectRepository(Users) private userRepository: Repository<Users>,
    @InjectRepository(Profiles) private profileRepository: Repository<Profiles>
    ){}
   
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
    

