import { Injectable } from '@nestjs/common';
import { User } from 'src/domain/user/user.entity';
import { UserInterface } from 'src/features/user/interfaces/user.interface';
import { DataSource, Repository } from 'typeorm';

@Injectable()
export class UserRepository extends Repository<User> {
  constructor(private dataSource: DataSource) {
    super(User, dataSource.createEntityManager());
  }

  public async createUser(
    payload: UserInterface,
    transaction = null,
  ): Promise<User> {
    if (transaction) {
      return await transaction.save(User, payload);
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
