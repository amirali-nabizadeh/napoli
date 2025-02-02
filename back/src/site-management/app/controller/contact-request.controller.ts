import { Body, Controller, Get, Post } from '@nestjs/common';
import { Public } from 'src/authentication/app/decorator/public-api.decorator';
import { ContactRequestRepositoryService } from 'src/site-management/model/contact-request/contact-request-repository.service';
import { ContactRequestAddDto } from 'src/site-management/model/contact-request/dto/contract-request-add.dto';
import { BaseController } from 'src/libs/nest/controller/base-controller.controller';
import { ContactRequest } from 'src/site-management/model/contact-request/contact-request.entity';

@Public()
@Controller('contact-request')
export class ContactRequestController extends BaseController<ContactRequest> {
  entity = ContactRequest;
  constructor(private readonly repo: ContactRequestRepositoryService) {
    super();
  }
  @Get()
  findAll() {
    return this.repo.getAll();
  }

  @Post()
  create(@Body() data: ContactRequestAddDto) {
    return this.repo.create(data);
  }
}
