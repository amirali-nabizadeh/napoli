import { AbilityBuilder, PureAbility } from '@casl/ability';
import { ActionEnum } from '../../providers/enum/action-enum';

export abstract class BaseAccess {
  private static registry: BaseAccess[] = [];

  constructor() {
    BaseAccess.registry.push(this);
  }

  abstract defineRules(
    user: any,
    builder: AbilityBuilder<PureAbility<[ActionEnum, any]>>,
  ): void;

  protected isAdmin(user: any): boolean {
    return user.role === 'admin';
  }

  protected allowAllActionsForAdmin(
    builder: AbilityBuilder<PureAbility<[ActionEnum, any]>>,
  ) {
    builder.can(ActionEnum.Manage, 'all');
  }

  static getAllPermissions(): BaseAccess[] {
    return BaseAccess.registry;
  }
}
