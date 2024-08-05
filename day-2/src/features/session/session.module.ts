import { Module } from '@nestjs/common';
import { SessionRepository } from 'src/infrastructure/repositries/session.repository';
import { SessionService } from './session.service';
import { SessionConroller } from './session.controller';

@Module({
  controllers: [SessionConroller],
  providers: [SessionRepository, SessionService],
})
export class SessionModule {}
