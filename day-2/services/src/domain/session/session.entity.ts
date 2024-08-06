import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  ManyToOne,
  JoinColumn,
} from 'typeorm';
import { User } from '../user/user.entity';
@Entity('Session')
export class Session {
  @PrimaryGeneratedColumn('uuid')
  uuid: string;

  @Column({ type: 'varchar', length: 50, nullable: false, unique: true })
  sessionId: string;

  @Column({ type: 'boolean', nullable: false, default: true })
  isActive: boolean;

  @ManyToOne(() => User, (user) => user.uuid, { onDelete: 'CASCADE'})
  @JoinColumn({ name: 'userId' })
  userId: User;
}
