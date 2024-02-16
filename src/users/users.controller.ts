import { Body, Controller, HttpStatus, NotFoundException, Param, Patch, Post, Put, Res, UseGuards } from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dtos/createUser.dto';
import { ApiResponse } from 'src/utils/response';
import { Response } from 'express';
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
  async registerUser(@Body() createUserDto: CreateUserDto,@Res() response: Response,
  ) {
    try {
      const createdUser = await this.usersService.registerUser(createUserDto);

      return new ApiResponse(response, 200, { message: 'User Created' });
    } catch (error) {
      if (
        error instanceof CustomError &&
        error.responseObject.message === 'Username already exists'
      ) {
        return new ApiResponse(response, HttpStatus.BAD_REQUEST, {
          message: error.message,
        });
      }
      throw new CustomError(404, { message: 'User not created' });
    }
  }

  @Put(':userId')
  async updateProfile(@Param('userId') id: number, @Body() updateProfileDto: UpdateProfileDto, @Res() response: Response) {
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

  @Patch(':id')
  async changeUserPassword(@Param('id') id:number, @Body() changePasswordDto: ChangePasswordDto, @Res() response: Response) {
    const passwordChanged = await this.usersService.changePassword(id, changePasswordDto);
    return new ApiResponse(response, 200, { message: "Password Changed successfully "})
  }


  @UseGuards(TokenVerificationGuard, ChangeLevelGuard)
  @Patch()
  async changeLevel(@Res() response: Response, @Body() changeLevelDto: ChangeLevelDto){
    const changedLevel = await this.usersService.changeLevel(changeLevelDto)
    new ApiResponse(response, 200, {message:"Level of the user changed"})
  }

}
