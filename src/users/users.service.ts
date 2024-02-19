import { BadRequestException, HttpStatus, Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { encryptPw } from '../utils/encrytPw'
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
      const { username, password, address, email, phoneNo, gender } =
        userDetails;

      const userProfileData = { username, address, email, phoneNo, gender };
      const userProfile = this.profileRepository.create(userProfileData);
      const savedUserProfile = await this.profileRepository.save(userProfile);

      const userCredentials = { username, password: encryptPw(password)};
      const user = this.userRepository.create(userCredentials);
      user.profile = savedUserProfile;
      return this.userRepository.save(user);
    } 
    catch (error) {
    throw new CustomError(HttpStatus.BAD_REQUEST, { message: error.message});
  }
}

  async updateProfile(id: string, updateProfile:UpdateProfileType){
    try{
      const user = await this.userRepository.findOneOrFail({where: { id: id}, relations:["profile"]})
      if(!user ||  !user.isActive){
        throw new NotFoundException('User Deleted cannot update')
      }
      Object.assign(user.profile, updateProfile);
      user.profile.updatedAt = new Date();
      return this.profileRepository.save(user.profile);;
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
     if(!user.isActive){
      throw new CustomError(HttpStatus.BAD_REQUEST, {message:"User already deleted!"})
     }
     user.password = ""; 
     user.isActive = false;
     user.updatedAt = new Date();
     await this.userRepository.save(user);
     console.log("User: " +user)
     return user;
  }
    
  async changePassword(id: string, changePasswordUser : ChangePasswordType){
    const { oldPassword, password } = changePasswordUser;
    const user = await this.userRepository.findOneOrFail({where: {id}})
    if(!user){
      throw new NotFoundException('User Not Found')
    }
   if(!user.isActive){
    throw new NotFoundException("User Deleted cannot change password")
   } 
   
   if (user.password !== encryptPw(oldPassword)) {
    throw new BadRequestException("Old password is incorrect");
}
    user.updatedAt = new Date();
    user.password = encryptPw(password)
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
