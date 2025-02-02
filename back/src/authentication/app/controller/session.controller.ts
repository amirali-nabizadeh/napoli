import { Body, Controller, Post } from '@nestjs/common';
import { SessionService } from '../service/session.service';
import { LoginUserDto } from 'src/authentication/model/user/dto/login.dto';
import { Public } from '../decorator/public-api.decorator';
import { User } from 'src/authentication/model/user/user.entity';
import { BaseController } from 'src/libs/nest/controller/base-controller.controller';

@Controller('session')
export class SessionController extends BaseController<User> {
  entity = User;
  constructor(private readonly sessionService: SessionService) {
    super();
  }

  @Public()
  @Post()
  login(@Body() data: LoginUserDto) {
    return this.sessionService.login(data);
  }
}
