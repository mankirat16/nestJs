import {
  Body,
  Controller,
  Get,
  HttpStatus,
  Post,
  Res,
  Req,
} from '@nestjs/common';
import { SessionService } from './session.service';
import { Request, Response } from 'express';

@Controller('/session')
export class SessionConroller {
  constructor(private sessionService: SessionService) {}
  @Post('all-sessions')
  async getAllSessions(
    @Body() body,
    @Req() req: Request,
    @Res() res: Response,
  ) {
    try {
      const sessions = await this.sessionService.findAllSessionsByUserUuid(
        body.uuid,
      );
      res.status(HttpStatus.OK).json(sessions);
    } catch (e) {
      console.log(e);
      res
        .status(HttpStatus.INTERNAL_SERVER_ERROR)
        .json({ message: 'Internal server error' });
    }
  }
}
