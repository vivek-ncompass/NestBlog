import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersModule } from './users/users.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Users } from './users/entity/users.entity';
import { Profiles } from './users/entity/profile.entity';

@Module({
  imports: [UsersModule, TypeOrmModule.forRoot(
    {
    type: 'mysql',
    host: 'localhost',
    port: 3306,
    username: 'root',
    password: 'mehulsql@2023',
    database: 'nestblog', 
    entities : [Users, Profiles],
    synchronize: true,
    }
  )],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
