import { Module } from '@nestjs/common';
import { User } from './model/user/user.entity';
import { UserRepositorySerive } from './model/user/user-repository.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserController } from './app/controller/user.controller';
import { SessionService } from './app/service/session.service';
import { SessionController } from './app/controller/session.controller';

@Module({
  imports: [TypeOrmModule.forFeature([User, UserRepositorySerive])],
  controllers: [UserController, SessionController],
  providers: [UserRepositorySerive, SessionService],
  exports: [UserRepositorySerive],
})
export class AuthenticationModule {}
