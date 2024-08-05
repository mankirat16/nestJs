import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { dataSource, dataSourceOptions } from 'ormconfig';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { SessionModule } from './features/session/session.module';
import { UserModule } from './features/user/user.module';
import { GatewayModule } from './infrastructure/gateway/gateway.module';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: async (configService: ConfigService) =>
        dataSourceOptions(configService),
      inject: [ConfigService],
    }),
    SessionModule,
    UserModule,
    GatewayModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
