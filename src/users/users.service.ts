import { HttpStatus, Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import * as md5 from 'md5';
import { Users } from './entity/users.entity';
import { CreateUserTypes } from './types/createUser.type';
import { UpdateProfileType } from './types/updateProfile.type';
import { Profiles } from './entity/profile.entity';
import { CustomError } from 'src/utils/customError';
import { ChangePasswordType } from './types/changePassword.type';
import { ChangeLevelParams } from './types/changeLevel.type';

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
    throw new CustomError(HttpStatus.BAD_REQUEST, { message: error.message});
  }
}

  async updateProfile(id: string, updateProfile:UpdateProfileType){
    try{
      const profile = await this.profileRepository.findOneOrFail({where:{id}});
      if(!profile){
        throw new NotFoundException('Unable to find Profile');
      }
      const user = await this.userRepository.findOneOrFail({where: { id: profile.id}})
      if(!user ||  !user.isActive){
        throw new NotFoundException('User Deleted cannot update')
      }
      Object.assign(profile, updateProfile);
      profile.updatedAt = new Date();
      await this.profileRepository.save(profile);
      return profile;
    } 
    catch (error) {
      throw new CustomError(HttpStatus.BAD_REQUEST, { message: error.message } )
    }
  }

  async deleteUser(id : string){
     const user = await this.userRepository.findOneOrFail({ where: {id}})
     if(!user){
      throw new NotFoundException('User Not Found')
     }
     user.password = ""; 
     user.isActive = false;
     user.updatedAt = new Date();
     await this.userRepository.save(user);
     return user;
  }
    
  async changePassword(id: string, changePasswordUser : ChangePasswordType){
    const user = await this.userRepository.findOneOrFail({where: {id}})
    if(!user){
      throw new NotFoundException('User Not Found')
    }
   if(!user.isActive){
    throw new NotFoundException("User Deleted cannot change password")
   } 
    user.updatedAt = new Date();
    user.password = md5(changePasswordUser.password)
    try{
      const passwordChanged = await this.userRepository.save(user); 
      return passwordChanged;
    }
    catch(error){
      throw new Error('Failed to change the password')
    };
  }

  async changeLevel(changeLevelParams: ChangeLevelParams){
    const userDetails = await this.userRepository.update({username:changeLevelParams.username},{level:changeLevelParams.level})
    return userDetails
  }
}
