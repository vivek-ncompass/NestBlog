import { Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Topics } from 'src/topic/entity/topic.entity';

@Module({
  imports:[
    TypeOrmModule.forFeature([Topics])
  ],
  controllers: [AuthController],
  providers: [AuthService]
})
export class AuthModule {}
