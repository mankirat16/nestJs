import {
  Body,
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  Post,
  Res,
  Req,
  UseGuards,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { AdminRoleGuard } from './auth.guard';
import { UsersService } from './users.service';
import { userDto } from './user.dto';
import { Request, Response } from 'express';
@Controller('/users')
export class UsersController {
  constructor(private UserService: UsersService) {}
  @Get('all-users')
  async getUsers(@Res() res: Response) {
    const result = await this.UserService.getAllUsers();
    console.log(`Total ${result.length} users were found`);
    res.status(200).json(result);
  }

  @Post('add-user')
  async setUser(@Body() userDto: userDto, @Res() res: any) {
    try {
      await this.UserService.createUser(userDto);
      return res.status(200).json({ message: 'user add' });
    } catch (e) {
      return res.status(404).json({
        message: 'Unable to add user',
      });
    }
  }

  @Post('login')
  async login(@Body() userDto: userDto, @Res() res: Response) {
    try {
      const result = await this.UserService.verifyUser(userDto);
      console.log(result);
      if (result) {
        res.status(HttpStatus.ACCEPTED).json({ message: 'User found' });
      } else {
        res.status(HttpStatus.FORBIDDEN).json({
          message: 'Invalid user id or pwd',
        });
      }
    } catch (e) {}
  }
}
