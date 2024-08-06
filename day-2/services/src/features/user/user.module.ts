import { UserRepository } from 'src/infrastructure/repositries/user.repository';
import { UserService } from './user.service';
import { Module } from '@nestjs/common';
import { UserController } from './user.controller';
import { SessionRepository } from 'src/infrastructure/repositries/session.repository';
import { GatewayModule } from 'src/infrastructure/gateway/gateway.module';
import { MyGateway } from 'src/infrastructure/gateway/gateway';

@Module({
  imports : [GatewayModule],
  controllers: [UserController],
  providers: [UserRepository, UserService,SessionRepository , MyGateway],
})
export class UserModule {}
