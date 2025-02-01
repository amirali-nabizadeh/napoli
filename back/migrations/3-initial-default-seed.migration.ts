import { Seeder } from 'src/libs/seeder/app/seeder';
import { ACTIONS } from './data/action.data';
import { Step } from 'src/libs/seeder/app/step';
import { Action } from 'src/authentication/model/action/action.entity';
import { Group } from 'src/authentication/model/group/group.entity';
import { GROUPS } from './data/group.data';
import { User } from 'src/authentication/model/user/user.entity';
import { USERS } from './data/user.data';
import { GROUP_USERS_USERS } from './data/group-users-user.data';

export class initialSeed1709538774874 extends Seeder {
  constructor() {
    super(
      new Step(Action, ACTIONS),
      new Step(Group, GROUPS),
      new Step(User, USERS),
      new Step('authentication__group_users_user', GROUP_USERS_USERS),
    );
  }
}
