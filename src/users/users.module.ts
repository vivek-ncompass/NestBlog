import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UsersController } from './users.controller';
import { UsersService } from './users.service';
import { Users } from './entity/users.entity';
import { Profiles } from './entity/profile.entity';
import { OTP } from 'src/auth/entity/otp.entity';


@Module({
  imports: [
    TypeOrmModule.forFeature([Users,Profiles, OTP]),
],
  controllers: [UsersController],
  providers: [UsersService]
})
export class UsersModule {}
