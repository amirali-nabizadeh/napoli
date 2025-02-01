import { Body, Controller, Get, Post, Put } from '@nestjs/common';
import { TodoAddDto } from 'src/site-management/model/todo/dto/todo-add.dto';
import { TodoUpdateDto } from 'src/site-management/model/todo/dto/todo-update.dto';
import { TodoRepositoryService } from 'src/site-management/model/todo/todo-repository.service';
import { TodoStateEnum } from 'src/site-management/model/todo/todo.entity';

@Controller('todo')
export class TodoController {
  constructor(private readonly repo: TodoRepositoryService) {}

  @Get()
  findall() {
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
