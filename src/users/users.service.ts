
import { HttpStatus, Injectable } from '@nestjs/common';
import { QueryFailedError, Repository } from 'typeorm';
import { Users } from './entity/users.entity';
import { InjectRepository } from '@nestjs/typeorm';
import * as md5 from 'md5';
import { CreateUserTypes } from './types/createUser.type';
import { Profiles } from './entity/profile.entity';
import { modifyUser } from './types/modifyUserRole.type';
import { CustomError } from 'src/utils/customError';


@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(Users) private userRepository: Repository<Users>,
    @InjectRepository(Profiles) private profileRepository: Repository<Profiles>,
  ) {}

  async findUserByUsername(username: string) {
    const user = await this.userRepository.findOne({ where: { username } });
    if (!user) {
      throw new Error('user not found');
    }
    return user;
  }

  async registerUser(userDetails: CreateUserTypes) {
    try {
      const { username, password, address, email, phoneNo, gender } =
        userDetails;

      const userProfileData = { username, address, email, phoneNo, gender };
      const userProfile = this.profileRepository.create(userProfileData);
      const savedUserProfile = await this.profileRepository.save(userProfile);

      const userCredentials = { username, password: md5(password) };
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

  async modifyUser(modifyUserDetails: modifyUser) {
    const { username, level } = modifyUserDetails;
    const user = await this.userRepository.findOne({ where: { username } });
    if (!user) {
      throw new Error(`User with name ${username} not found`);
    }
    user.level = level;
    await this.userRepository.save(user);
  }
}
