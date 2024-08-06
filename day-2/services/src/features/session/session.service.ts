import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { SessionRepository } from 'src/infrastructure/repositries/session.repository';
import { SessionInterface } from './interfaces/session.interface';
import { Session } from 'src/domain/session/session.entity';
import { User } from 'src/domain/user/user.entity';
@Injectable()
export class SessionService {
  constructor(
    @InjectRepository(SessionRepository)
    private sessionRepository: SessionRepository,
  ) {}

  async findAllSessionsByUserUuid(userUuid: string): Promise<Session[]> {
    return await this.sessionRepository.find({
      where: { userId: { uuid: userUuid }, isActive: true },
      relations: ['userId'],
    });
  }
}
