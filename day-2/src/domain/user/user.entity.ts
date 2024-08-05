import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';
@Entity('User')
export class User {
  @PrimaryGeneratedColumn('uuid')
  uuid: string;

  @Column({ type: 'varchar', length: 50, nullable: false })
  name: string;

  @Column({ type: 'varchar', length: 50, unique: true, nullable: false })
  email: string;

  @Column({ type: 'varchar', length: 65, nullable: false })
  password: string;

  @Column({ type: 'varchar', length: 65, nullable: true })
  otp: string;
}
