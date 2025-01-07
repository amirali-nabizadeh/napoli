import { Body, Controller, Post } from '@nestjs/common';
import { SessionService } from '../service/session.service';
import { LoginUserDto } from 'src/authentication/model/user/dto/login.dto';

@Controller('session')
export class SessionController {
  constructor(private readonly sessionService: SessionService) {}

  @Post()
  login(@Body() data: LoginUserDto) {
    return this.sessionService.login(data);
  }
}
