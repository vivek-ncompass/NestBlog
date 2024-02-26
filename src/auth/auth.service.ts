import { HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { JwtService } from '@nestjs/jwt';
import { Repository } from 'typeorm';
import { encryptPw } from '../utils/encrytPw'
import { Users } from 'src/users/entity/users.entity';
import { CustomError } from 'src/utils/customError';
import { LoginUserTypes } from './types/loginUser.type';
import { OTP } from './entity/otp.entity';
import { ForgotPassParams } from './types/forgotPass.type';
import { ResetPassParams } from './types/resetPass.type';


@Injectable()
export class AuthService {

 constructor(
    @InjectRepository(Users) private userRepository: Repository<Users>,
    private readonly jwtService: JwtService,
    @InjectRepository(OTP) private otpRepository: Repository<OTP>
 ){};

  async login(loginDetails: LoginUserTypes): Promise<any> {
    const { username, password } = loginDetails;
    const user = await this.userRepository.findOneOrFail({
      where: { username, password: encryptPw(password), isActive: true },
    });
    if (user) {
      const payload = { username: user.username, level: user.level};
      return this.jwtService.sign(payload);
    } 
    else {
      throw new CustomError(400, { message: 'Invalid username or password' });
    }
  }

  async forgotGenrateOtp(forgotData: ForgotPassParams){
    const user = await this.userRepository.findOne({where: {username: forgotData.username}})
    if(!user || user.isActive === false){
      throw new CustomError(HttpStatus.BAD_REQUEST,{message:"Enter a correct username"})
    }
    
    const checkOtpPresentData = await this.otpRepository.findOne({where: {username: forgotData.username}})
    if(checkOtpPresentData){
      throw new CustomError(HttpStatus.CONFLICT,{message:"Otp already Generated"})
    }

    const generatedOtp = Math.floor(Math.random()*(900000)) + 100000
    const expireTime = new Date()
    expireTime.setMinutes(expireTime.getMinutes() + 15)
    try{
      const newOtp = this.otpRepository.create({username: forgotData.username, otp: generatedOtp, expire_time: expireTime})
      const savedOtp = await this.otpRepository.save(newOtp)
      user.otp = savedOtp
      await this.userRepository.save(user)
      return savedOtp
    }
    catch(error){
      throw new CustomError(HttpStatus.BAD_REQUEST,{message:error.message})
    }
  }

  async forgotVerifyOtp(resetPassParams: ResetPassParams){
    const otpFromDatabase = await this.otpRepository.findOne({where:{username: resetPassParams.username}})

    if(!otpFromDatabase || otpFromDatabase.otp != resetPassParams.otp || resetPassParams.password !== resetPassParams.confirm_password){
      throw new CustomError(HttpStatus.BAD_REQUEST,{message:"Wrong Inputs"})
    }

    if (otpFromDatabase.expire_time< new Date()){
      await this.otpRepository.delete({username:resetPassParams.username})
      throw new CustomError(HttpStatus.BAD_REQUEST,{message:"OTP Expired"}) 
    }

    const hashed_pass = encryptPw(resetPassParams.password)
    await this.otpRepository.delete({username:resetPassParams.username})
    return this.userRepository.update({username:resetPassParams.username},{password:hashed_pass, updatedAt: new Date()})

  }

}
