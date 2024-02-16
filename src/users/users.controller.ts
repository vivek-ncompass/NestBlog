import { Body, ConflictException, Controller, NotFoundException, Param, Post, Put, Res, UnauthorizedException } from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dtos/createUser.dto';
import { ApiResponse } from 'src/utils/response';
import { Response } from 'express';
import { UpdateProfileDto } from './dtos/updateProfile.dto';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService : UsersService){}

  @Post()
  async registerUser(@Body() createUserDto : CreateUserDto, @Res() response: Response){
   try{
    const createdUser = await this.usersService.registerUser(createUserDto);
    if (!createdUser)
      throw new Error();
    return new ApiResponse(response, 200, {message:"User Created"});
  }
  catch( error ){
    if (error instanceof Error) {
      return new ApiResponse(response, 409, { message: "Username already exists" });
    } 
    else {
      return new ApiResponse(response, 500, { message: "Failed to register user" });
}
  }
}

@Put(':id') 
  async updateProfile(@Param('id') id: number, @Body() updateProfileDto: UpdateProfileDto, @Res() response: Response) {
  
    try {
      const updatedProfile = await this.usersService.updateProfile(id,updateProfileDto); 
      return new ApiResponse(response, 200, { message: "Profile updated successfully", profile: updatedProfile });
    } catch (error) {
      if (error instanceof NotFoundException) {
        return new ApiResponse(response, 404, { message: "Profile not found" });
      } else {
        return new ApiResponse(response, 500, { message: "Failed to update profile" });
      }
    }
  }
}



