import { Controller } from '@nestjs/common';
import { BaseController } from 'src/libs/nest/controller/base-controller.controller';
import { Group } from 'src/authentication/model/group/group.entity';

@Controller('group')
export class GroupController extends BaseController<Group> {
  entity = Group;
}
