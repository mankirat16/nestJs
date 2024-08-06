import { User } from 'src/domain/user/user.entity';
export interface SessionInterface {
  uuid: string;
  userId: string;
  sessionId: string;
  isActive: boolean;
}
