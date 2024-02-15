import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Users } from 'src/users/entity/users.entity';
import { Repository } from 'typeorm';
import { LoginUserTypes } from './types/loginUser.type';
import * as md5 from 'md5';
import { UpdateUserTypes } from './types/updateUser.type';
import { CustomError } from 'src/utils/customError';
import { JwtService } from '@nestjs/jwt';
import { LoginUserType } from './type/loginUser.type';

@Injectable()
export class AuthService {

 constructor(
    @InjectRepository(Users) 
    private userRepository: Repository<Users>,
    private readonly jwtService: JwtService,
 ){};


 async login(loginDetails: LoginUserType): Promise<any> {
    const { username, password } = loginDetails;
    const user = await this.userRepository.findOne({
      where: { username, password: md5(password) },
    });
    if (user) {
      const payload = {
        username: user.username,
        level: user.level,
      };

      return this.jwtService.sign(payload);
    } else {
      throw new CustomError(400, { message: 'Invalid username or password' });
    }
  }

 
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
