import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Users } from 'src/users/entity/users.entity';
import { Repository } from 'typeorm';
import { LoginUserTypes } from './types/loginUser.type';
import * as md5 from 'md5';
import { UpdateUserTypes } from './types/updateUser.type';

@Injectable()
export class AuthService {

 constructor(
    @InjectRepository(Users) 
    private userRepository: Repository<Users>
 ){};

 async loginUser(loginUserDetails : LoginUserTypes){
     const { username, password} = loginUserDetails;
     
     // checking username and password
      const res = this.userRepository.findOne({ where: {username: username, password: md5(password)}})

 }

 async updateUser(updateUserDetails : UpdateUserTypes){
       const { id , level } = updateUserDetails;
       
 }

}
