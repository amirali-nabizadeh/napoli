import { MiddlewareConsumer, Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TypeOrmConfigService } from './data.source';
import { AuthenticationModule } from './authentication/authentication.module';
import { ClsModule, ClsService } from 'nestjs-cls';
import { NestModule } from './libs/nest/nest.module';

@Module({
  imports: [
    ClsModule,
    TypeOrmModule.forRootAsync({
      useClass: TypeOrmConfigService,
    }),
    AuthenticationModule,
    NestModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {
  constructor(private readonly clsService: ClsService) {}
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply((req, res, next) => {
        this.clsService.run(() => {
          next();
        });
      })
      .forRoutes('*');
  }
}
