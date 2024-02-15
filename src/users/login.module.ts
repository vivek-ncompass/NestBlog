import { Module } from '@nestjs/common';
import { LoginService } from './login.service';
import { UsersModule } 

@Module({
  imports: [UsersModule], 
  providers: [LoginService], 
  exports: [LoginService], 
})
export class LoginModule {}
