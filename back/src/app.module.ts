import { MiddlewareConsumer, Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TypeOrmConfigService } from './data.source';
import { AuthenticationModule } from './authentication/authentication.module';
import { ClsModule, ClsService } from 'nestjs-cls';
import { NestModule } from './libs/nest/nest.module';
import { SiteManagementModule } from './site-management/site-management.module';
import { CaslModule } from './libs/casl/src/casl.module';

@Module({
  imports: [
    ClsModule,
    TypeOrmModule.forRootAsync({
      useClass: TypeOrmConfigService,
    }),
    AuthenticationModule,
    NestModule,
    SiteManagementModule,
    CaslModule,
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
