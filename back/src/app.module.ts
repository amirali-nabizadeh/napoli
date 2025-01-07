import { Module } from '@nestjs/common';
import { AuthorizationModule } from './authorization/authorization.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TypeOrmConfigService } from './data.source';

@Module({
  imports: [
    TypeOrmModule.forRootAsync({
      useClass: TypeOrmConfigService,
    }),
    AuthorizationModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
