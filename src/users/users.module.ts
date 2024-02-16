import { Module } from '@nestjs/common';
import { UsersController } from './users.controller';
import { UsersService } from './users.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Users } from './entity/users.entity';
import { Profiles } from './entity/profile.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Users,Profiles])],
  controllers: [UsersController],
  providers: [UsersService]
})
export class UsersModule {}
