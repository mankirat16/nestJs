import {
  Body,
  Controller,
  Get,
  HttpStatus,
  Post,
  Res,
  Req,
} from '@nestjs/common';
import { UserService } from './user.service';
import { UserInterface } from './interfaces/user.interface';
import { Request, Response } from 'express';
import { UserDto } from './dto/user.dto';
import { LogInDto } from './dto/userLogin.dto';
@Controller('/user')
export class UserController {
  constructor(private userService: UserService) {}
  @Get('all-users')
  async getHello(@Res() res: Response, @Req() req) {
    try {
      const users = await this.userService.getAllUsers();
      return res.status(HttpStatus.OK).json(users);
    } catch (e) {
      console.log(e);
      return res
        .status(HttpStatus.INTERNAL_SERVER_ERROR)
        .json({ message: 'Internal server error' });
    }
  }
  @Post('add-user')
  async createUser(@Body() body: UserDto, @Res() res: Response, @Req() req) {
    try {
      await this.userService.createUser(body, req.sessionID);
      req.session.user = true;
      return res
        .status(HttpStatus.OK)
        .json({ message: 'User added successfully' });
    } catch (e) {
      console.log(e);
      return res
        .status(HttpStatus.INTERNAL_SERVER_ERROR)
        .json({ message: e, statusCode: 404 });
    }
  }

  @Post('login')
  async login(@Body() body: LogInDto, @Res() res: Response, @Req() req) {
    if (req.session.user) {
      return res
        .status(200)
        .json({ message: 'logged in successfully due to active session' });
    }
    try {
      const result = await this.userService.login(body);
      if (result) {
        req.session.user = true;
        res
          .status(HttpStatus.ACCEPTED)
          .json({ messsage: 'Logged in Successfully', token: result });
      } else {
        res
          .status(HttpStatus.FORBIDDEN)
          .json({ message: 'Invalid username or password' });
      }
    } catch (e) {
      res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({ message: e });
    }
  }
  @Post('edit-user')
  async editUser(@Body() body, @Res() res: Response) {
    try {
      const result = await this.userService.editUser(body);
      console.log(result);
      if (result)
        return res
          .status(HttpStatus.OK)
          .json({ message: 'user modified successfully' });
      else {
        res
          .status(HttpStatus.EXPECTATION_FAILED)
          .json({ message: 'failed to modify user' });
      }
    } catch (e) {
      console.log(e);
      return res
        .status(HttpStatus.INTERNAL_SERVER_ERROR)
        .json({ message: 'An error occured' });
    }
  }

  @Post('set-otp')
  async setOtp(@Body() body, @Res() res: Response) {
    try {
      await this.userService.setOtp(body.email);
      res.status(HttpStatus.OK).json({
        message: 'otp sent successfully',
      });
    } catch (e) {
      console.log(e);
      return res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({
        message: 'error while generating otp ',
      });
    }
  }

  @Post('verify-otp')
  async verifyOtp(@Body() body: UserInterface, @Res() res: Response) {
    try {
      const result = await this.userService.verifyOtp(body);
      if (result) {
        return res.status(HttpStatus.OK).json({
          message: 'otp verified',
        });
      } else {
        return res.status(HttpStatus.FORBIDDEN).json({
          message: 'wrong otp',
        });
      }
    } catch (e) {
      console.log(e);
      return res
        .status(HttpStatus.INTERNAL_SERVER_ERROR)
        .json({ message: 'Internal server error' });
    }
  }
}
