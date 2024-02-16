import { Body, Controller, HttpStatus, Post, Res } from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dtos/createUser.dto';
import { ApiResponse } from 'src/utils/response';
import { Response } from 'express';
import { CustomError } from 'src/utils/customError';
import { UpdateUserDto } from './dtos/UpdateUserDto.dto';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Post()
  async registerUser(
    @Body() createUserDto: CreateUserDto,
    @Res() response: Response,
  ) {
    try {
      const createdUser = await this.usersService.registerUser(createUserDto);

      return new ApiResponse(response, 200, { message: 'User Created' });
    } 
    catch (error) {
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

  @Post('/modifyUser')
  async modifyUserAccess(
    @Body() updateUserDto: UpdateUserDto,
    @Res() response: Response,
  ) {
    this.usersService.modifyUser(updateUserDto);
    return new ApiResponse(response, 200, { message: 'Level upgraded' });
  }
}
