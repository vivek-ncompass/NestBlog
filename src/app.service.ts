import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { LessThan, Repository } from 'typeorm';
import { OTP } from './auth/entity/otp.entity';
import { Cron } from '@nestjs/schedule';

@Injectable()
export class AppService {

  constructor(@InjectRepository(OTP) private otpRepository: Repository<OTP>){}

  getHello(): string {
    return 'Hello World!';
  }

  @Cron("*/10 * * * *")
  async deleteOldOtp(){
    await this.otpRepository.delete({
      expire_time: LessThan(new Date())
    })
  }
}
