import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { Users } from 'src/users/entity/users.entity';
import { Topics } from 'src/topic/entity/topic.entity';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    TypeOrmModule.forFeature([Users, Topics]),
    JwtModule.register({
      secret: process.env.JWT_KEY,
      global:true
    }),
  ],
  controllers: [AuthController],
  providers: [AuthService],
})
export class AuthModule {}
