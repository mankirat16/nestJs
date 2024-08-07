import { UserRepository } from 'src/infrastructure/repositries/user.repository';
import { InjectRepository } from '@nestjs/typeorm';
import { UserInterface } from './interfaces/user.interface';
import { User } from 'src/domain/user/user.entity';
import { SessionRepository } from 'src/infrastructure/repositries/session.repository';
import * as bcrypt from 'bcryptjs';
import { MyGateway } from 'src/infrastructure/gateway/gateway';
const saltRounds = 10;
const salt = bcrypt.genSaltSync(saltRounds);
import { dataSource } from 'ormconfig';
import { UserDto } from './dto/user.dto';
import { LogInDto } from './dto/userLogin.dto';
import { BadRequestException, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
export class UserService {
  constructor(
    @InjectRepository(UserRepository)
    private userRepository: UserRepository,
    @InjectRepository(SessionRepository)
    private sessionRepository: SessionRepository,
    private myGateway: MyGateway,
    private jwtService: JwtService,
  ) {}
  checkPoint(): string {
    return 'hello';
  }
  async createUser(payload: UserDto, sessionID: string): Promise<User> {
    const emailInUse = await this.userRepository.findOne({
      where: {
        email: payload.email,
      },
    });
    if (emailInUse) {
      throw new BadRequestException('Email already in use');
    }
    payload.password = bcrypt.hashSync(payload.password, salt);

    const user = await this.userRepository.create(payload);
    const result = await this.userRepository.save(user);
    const newSession = await this.sessionRepository.create({
      sessionId: sessionID,
      userId: result,
      isActive: true,
    });
    this.sessionRepository.save(newSession);
    this.myGateway.handleRoom(user.uuid);
    return user;
  }
  async login(payload: LogInDto): Promise<string> {
    const user = await this.userRepository.findOne({
      where: {
        email: payload.email,
      },
    });
    if (!user) {
      throw new UnauthorizedException('User does not exist');
    }
    if (bcrypt.compareSync(payload.password, user.password)) {
      return await this.generateUserToken(user);
    }
    return 'Invalid username or password';
  }
  async getAllUsers(): Promise<Object[]> {
    const users = await this.userRepository.find();
    return users;
  }
  async editUser(payload: UserInterface) {
    const result = await dataSource
      .createQueryBuilder()
      .update(User)
      .set({ name: payload.name })
      .where('email = :email', { email: payload.email })
      .execute();
    return result;
  }
  generateOTP = () => {
    var digits = '0123456789';
    let OTP = '';
    for (let i = 0; i < 6; i++) {
      OTP += digits[Math.floor(Math.random() * 10)];
    }
    return OTP;
  };
  async setOtp(email: string) {
    const otp = this.generateOTP();
    const user = await this.userRepository.findOne({
      where: {
        email: email,
      },
    });
    const result = await dataSource
      .createQueryBuilder()
      .update(User)
      .set({ otp: otp })
      .where('email = :email', { email: email })
      .execute();
    this.myGateway.sendOtpToAllClients(otp, user.uuid);
    return result;
  }
  async verifyOtp(payload: UserInterface) {
    const user = await this.userRepository.findOne({
      where: {
        email: payload.email,
      },
    });
    if (user.otp === payload.otp) {
      return true;
    } else {
      return false;
    }
  }
  async generateUserToken(user: UserDto) {
    return await this.jwtService.sign(
      {
        user,
      },
      { expiresIn: '2 days' },
    );
  }
}
