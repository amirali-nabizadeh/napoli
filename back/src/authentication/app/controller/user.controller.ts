import { Body, Controller, Delete, Get, Param, Post } from '@nestjs/common';
import { SignupDto } from 'src/authentication/model/user/dto/signup.dto';
import { UserRepositoryService } from 'src/authentication/model/user/user-repository.service';

@Controller('user')
export class UserController {
  constructor(private readonly repo: UserRepositoryService) {}
  @Get()
  findAll() {
    return this.repo.getAll();
  }

  @Get(':id')
  findByid(@Param('id') id: number) {
    return this.repo.findById(id);
  }

  @Post()
  create(@Body() data: SignupDto) {
    return this.repo.create(data);
  }

  @Delete(':id')
  delete(@Param('id') id: number) {
    return this.repo.delete(id);
  }
}
