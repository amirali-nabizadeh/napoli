import { Module } from '@nestjs/common';
import { User } from './model/user/user.entity';
import { UserRepositorySerive } from './model/user/user-repository.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserController } from './app/controller/user.controller';
import { SessionService } from './app/service/session.service';
import { SessionController } from './app/controller/session.controller';
import { AuthService } from './app/service/auth.service';
import { JwtModule } from '@nestjs/jwt';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { IsEmailAlreadyExist } from './app/validator/is-email-already-exist.validator';
import { IsUserNameAlreadyExist } from './app/validator/is-username-already-exist.validator';

@Module({
  imports: [
    ConfigModule,
    TypeOrmModule.forFeature([User]),
    JwtModule.registerAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: async (configService: ConfigService) => ({
        global: true,
        secret: configService.get('JWT_SECRETS'),
        signOptions: { expiresIn: '60s' },
      }),
    }),
  ],
  controllers: [UserController, SessionController],
  providers: [
    UserRepositorySerive,
    SessionService,
    AuthService,
    IsEmailAlreadyExist,
    IsUserNameAlreadyExist,
  ],
  exports: [UserRepositorySerive, SessionService, AuthService],
})
export class AuthenticationModule {}
