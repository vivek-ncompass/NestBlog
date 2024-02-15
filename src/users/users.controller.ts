import { Body, Controller, Post, Res } from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dtos/createUser.dto';
import { ApiResponse } from 'src/utils/response';
import { Response } from 'express';
import { CustomError } from 'src/utils/customError';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService : UsersService){}

  @Post()
  async registerUser(@Body() createUserDto : CreateUserDto, @Res() response: Response){
    try{
      const createdUser = await this.usersService.registerUser(createUserDto);
      return new ApiResponse(response, 200, {message:"User Created"});
    }
    catch( error ){
      throw new CustomError(404, {message:"User not created"})
    }
  }
}
