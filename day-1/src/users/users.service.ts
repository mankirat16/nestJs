import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './user.entity';
import { Repository } from 'typeorm';
import { userDto } from './user.dto';
import * as bcryptjs from 'bcryptjs';
const saltRounds = 10;
const salt = bcryptjs.genSaltSync(saltRounds);
@Injectable()
export class UsersService {
  constructor(@InjectRepository(User) private userRepo: Repository<User>) {}
  getUserById(): string {
    return 'user found';
  }
  createUser(userDto: userDto): Promise<any> {
    userDto.password = bcryptjs.hashSync(userDto.password, salt);
    const newUser = this.userRepo.create(userDto);
    return this.userRepo.save(newUser);
  }
  async verifyUser(userDto: userDto): Promise<any> {
    const user = await this.userRepo.findOne({
      where: { email: userDto.email },
    });
    if (user && bcryptjs.compareSync(userDto.password, user.password)) {
      return true;
    } else {
      return false;
    }
  }

  async getAllUsers(): Promise<Object[]> {
    const allUsers = await this.userRepo.find();
    return allUsers;
  }
}
