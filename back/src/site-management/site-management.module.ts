import { Module } from '@nestjs/common';
import { ContactRequestRepositoryService } from './model/contact-request/contact-request-repository.service';
import { ContactRequestController } from './app/controller/contact-request.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ContactRequest } from './model/contact-request/contact-request.entity';

@Module({
  imports: [TypeOrmModule.forFeature([ContactRequest])],
  controllers: [ContactRequestController],
  providers: [ContactRequestRepositoryService],
  exports: [ContactRequestRepositoryService],
})
export class SiteManagementModule {}
