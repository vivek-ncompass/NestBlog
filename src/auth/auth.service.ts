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

 // login user


 
 async modifyUser(updateUserDetails : UpdateUserTypes){
       const { id , level } = updateUserDetails;
       // find the user through id
       const user = await this.userRepository.findOne( { where : { id} } );
       if (!user) {
        throw new Error(`User with ID ${id} not found`);
      }
       // change the level of user 
       user.level = level;
       await this.userRepository.save(user);            
 }

}
