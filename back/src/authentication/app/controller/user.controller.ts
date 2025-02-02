import { Body, Controller, Delete, Get, Param, Post } from '@nestjs/common';
import { SignupDto } from 'src/authentication/model/user/dto/signup.dto';
import { UserRepositoryService } from 'src/authentication/model/user/user-repository.service';
import { User } from 'src/authentication/model/user/user.entity';
import { BaseController } from 'src/libs/nest/controller/base-controller.controller';

@Controller('user')
export class UserController extends BaseController<User> {
  entity = User;
  constructor(private readonly repo: UserRepositoryService) {
    super();
  }
  @Get()
  findAll() {
    return this.repo.getAll();
  }

  @Get(':id')
  findById(@Param('id') id: number) {
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
