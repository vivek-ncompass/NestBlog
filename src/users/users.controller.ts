import { Body, Controller, Post, Res, ConflictException } from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dtos/createUser.dto';
import { ApiResponse } from 'src/utils/response';
import { Response } from 'express';

@Controller()
export class UsersController {
    constructor(
      
        private readonly usersService: UsersService
    ){}
    @Post('users')
    async registerUser(@Body() createUserDto: CreateUserDto, @Res() response: Response) {
        try {
            const createdUser = await this.usersService.registerUser(createUserDto);
            return new ApiResponse(response, 201, { message: "User Created" });
        } catch (error) {
            if (error instanceof ConflictException) {
                return new ApiResponse(response, 409, { message: "Username already exists" });
            } else {
                return new ApiResponse(response, 500, { message: "Failed to register user" });
            }
        }
    }
}
