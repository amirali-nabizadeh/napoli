import { Body, Controller, Get, Post, Put } from '@nestjs/common';
import { TodoAddDto } from 'src/site-management/model/todo/dto/todo-add.dto';
import { TodoUpdateDto } from 'src/site-management/model/todo/dto/todo-update.dto';
import { TodoRepositoryService } from 'src/site-management/model/todo/todo-repository.service';
import {
  Todo,
  TodoStateEnum,
} from 'src/site-management/model/todo/todo.entity';
import { BaseController } from 'src/libs/nest/controller/base-controller.controller';

@Controller('todo')
export class TodoController extends BaseController<Todo> {
  entity = Todo;
  constructor(private readonly repo: TodoRepositoryService) {
    super();
  }

  @Get()
  findAll() {
    return this.repo.getAll();
  }

  @Post()
  create(@Body() data: TodoAddDto) {
    data.state = TodoStateEnum.todo;
    this.repo.create(data);
  }

  @Put()
  update(@Body() data: TodoUpdateDto) {
    this.repo.update(data);
  }
}
