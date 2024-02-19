import { Body, Controller, Delete, HttpStatus, Param, Patch, Post, Put, Res, UseGuards, ValidationPipe } from '@nestjs/common';
import { Response } from 'express';
import { UsersService } from './users.service';
import { CreateUserDto } from './dtos/createUser.dto';
import { ApiResponse } from 'src/utils/response';
import { CustomError } from 'src/utils/customError';
import { UpdateProfileDto } from './dtos/updateProfile.dto';
import { ChangePasswordDto } from './dtos/changePassword.dto';
import { ChangeLevelDto } from './dtos/changeLevel.dto';
import { TokenVerificationGuard } from 'src/auth/guard/tokenVerification.guard';
import { ChangeLevelGuard } from 'src/auth/guard/changeLevelGuard.guard';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}
  @Post()
  async registerUser(@Body(ValidationPipe) createUserDto: CreateUserDto,@Res() response: Response,
  ) {
    try {
      const createdUser = await this.usersService.registerUser(createUserDto);     
      return new ApiResponse(response, 200, { message: 'User Created' });
    } catch (error) {
      throw new CustomError(404, { message: error.message });
    }
  }

  @UseGuards(TokenVerificationGuard)
  @Put(':userId')
  async updateProfile(@Param('userId') id: string, @Body(ValidationPipe) updateProfileDto: UpdateProfileDto, @Res() response: Response) {
    try {
      const updatedProfile = await this.usersService.updateProfile(id,updateProfileDto);
      return new ApiResponse(response, 200, { message: "Profile updated successfully"});
    } catch (error) {
      throw new CustomError(HttpStatus.BAD_REQUEST, { message: error.message })
    }
  }

  @UseGuards(TokenVerificationGuard)
  @Delete(':userId')
  async deleteUser(@Param('userId') id: string, @Res() response : Response){
    try{
    const deletedUser = await this.usersService.deleteUser(id);
    return new ApiResponse(response,200, { message: 'User Deleted Successfully'}) 
  }
  catch(error){
    throw new CustomError(HttpStatus.BAD_REQUEST, { message: error.message})
  }
}

  @UseGuards(TokenVerificationGuard)
  @Patch(':id')
  async changeUserPassword(@Param('id') id:string, @Body(ValidationPipe) changePasswordDto: ChangePasswordDto, @Res() response: Response) {
    const passwordChanged = await this.usersService.changePassword(id, changePasswordDto);
    return new ApiResponse(response, 200, { message: "Password Changed successfully "})
  }


  @UseGuards(TokenVerificationGuard, ChangeLevelGuard)
  @Patch()
  async changeLevel(@Res() response: Response, @Body(ValidationPipe) changeLevelDto: ChangeLevelDto){
    const changedLevel = await this.usersService.changeLevel(changeLevelDto)
    new ApiResponse(response, 200, {message:"Level of the user changed"})
  }

}
