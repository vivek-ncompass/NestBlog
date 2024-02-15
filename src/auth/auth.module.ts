import { Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Topics } from 'src/topic/entity/topic.entity';
import { JwtModule } from '@nestjs/jwt';

@Module({
  imports:[
    TypeOrmModule.forFeature([Topics]),
    JwtModule.register({
        secret: process.env.JWT_SECRET,
        signOptions: { expiresIn : '60m'}
      })
  ],
  controllers: [AuthController],
  providers: [AuthService]
})
export class AuthModule {}
