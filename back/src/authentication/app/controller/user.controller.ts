import { Body, Controller, Delete, Get, Post, Query } from '@nestjs/common';
import { UserRepositorySerive } from 'src/authentication/model/user/user-repository.service';
import { User } from 'src/authentication/model/user/user.entity';

@Controller('user')
export class UserController {
  constructor(private readonly repo: UserRepositorySerive) {}
  @Get()
  findAll() {
    return this.repo.getAll();
  }

  @Get(':id')
  findByid(@Query('id') id: number) {
    return this.repo.findById(id);
  }

  @Post()
  create(@Body() data: User) {
    return this.repo.create(data);
  }

  @Delete(':id')
  delete(@Query('id') id: number) {
    this.repo.delete(id);
  }
}
