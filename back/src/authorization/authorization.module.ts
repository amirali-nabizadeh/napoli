import { Module } from '@nestjs/common';
import { User } from './model/user/user.entity';
import { UserController } from './app/controller/user.controller';
import { GroupController } from './app/controller/group.controller';
import { UserRepositorySerive } from './model/user/user-repository.service';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [TypeOrmModule.forFeature([User, UserRepositorySerive])],
  controllers: [UserController, GroupController],
  providers: [UserRepositorySerive],
  exports: [UserRepositorySerive],
})
export class AuthorizationModule {}
