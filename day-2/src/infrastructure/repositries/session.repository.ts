import { Injectable } from '@nestjs/common';
import { Session } from 'src/domain/session/session.entity';
import { SessionInterface } from 'src/features/session/interfaces/session.interface';
import { DataSource, Repository } from 'typeorm';

@Injectable()
export class SessionRepository extends Repository<Session> {
  constructor(private dataSource: DataSource) {
    super(Session, dataSource.createEntityManager());
  }

  public async createSession(
    payload: Session,
    transaction = null,
  ): Promise<Session> {
    if (transaction) {
      return await transaction.save(Session, payload);
    }
    return await this.save(payload);
  }

  //   async getAdvisorByEmail(email: string): Promise<SessionInterface> {
  //     // return await this.findOne({ where: { email } });
  //   }

  //   async getAdvisorByUUID(uuid: string): Promise<SessionInterface\> {
  //     // return await this.findOne({ where: { uuid } });
  //   }
}
