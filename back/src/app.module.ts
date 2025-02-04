import { MiddlewareConsumer, Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TypeOrmConfigService } from './data.source';
import { AuthenticationModule } from './authentication/authentication.module';
import { ClsModule, ClsService } from 'nestjs-cls';
import { NestModule } from './libs/nest/nest.module';
import { SiteManagementModule } from './site-management/site-management.module';
import { MinioModule } from 'nestjs-minio-client';
import { ConfigModule, ConfigService } from '@nestjs/config';

@Module({
  imports: [
    ClsModule,
    TypeOrmModule.forRootAsync({
      useClass: TypeOrmConfigService,
    }),
    MinioModule.registerAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (config: ConfigService) => {
        return {
          endPoint: config.get('MINIO_ENDPOINT') || 'minio',
          port: parseInt(config.get('MINIO_PORT')) || 9000,
          useSSL: false,
          accessKey: config.get('MINIO_ACCESS_KEY') || 'minio',
          secretKey: config.get('MINIO_SECRET_KEY') || 'minio123',
        };
      },
    }),
    AuthenticationModule,
    NestModule,
    SiteManagementModule,
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
