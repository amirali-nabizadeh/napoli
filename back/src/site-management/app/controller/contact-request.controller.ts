import { Body, Controller, Get, Post } from '@nestjs/common';
import { Public } from 'src/authentication/app/decorator/public-api.decorator';
import { ContactRequestRepositoryService } from 'src/site-management/model/contact-request/contact-request-repository.service';
import { ContactRequestAddDto } from 'src/site-management/model/contact-request/dto/contract-request-add.dto';

@Public()
@Controller('contact-request')
export class ContactRequestController {
  constructor(private readonly repo: ContactRequestRepositoryService) {}
  @Get()
  findAll() {
    return this.repo.getAll();
  }

  @Post()
  create(@Body() data: ContactRequestAddDto) {
    return this.repo.create(data);
  }
}
