import { Body, Controller, Get, Post, Query } from '@nestjs/common';
import { UserRepositorySerive } from 'src/authorization/model/user/user-repository.service';
import { User } from 'src/authorization/model/user/user.entity';

@Controller('user')
export class UserController {
  constructor(private readonly repo: UserRepositorySerive) {}
  @Get()
  findAll() {
    this.repo.getAll();
  }

  @Get(':id')
  findByid(@Query('id') id: number) {
    this.repo.findById(id);
  }

  @Post()
  create(@Body() data: User) {
    this.repo.create(data);
  }
}
