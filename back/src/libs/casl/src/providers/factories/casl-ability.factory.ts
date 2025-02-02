import { Injectable } from '@nestjs/common';
import { AbilityBuilder, PureAbility } from '@casl/ability';
import { BaseAccess } from '../../app/access/base-access';
import { ActionEnum } from '../enum/action-enum';
import { TypeormRealEntity } from 'src/libs/ORM/typeorm-real-entity/typeorm-real.entity';
import { RootEntityClass } from 'src/libs/ORM/root-entity/root-entity-class';

@Injectable()
export class CaslAbilityFactory {
  createForUser(
    user: any,
  ): PureAbility<[ActionEnum, RootEntityClass<TypeormRealEntity> | string]> {
    const abilityBuilder = new AbilityBuilder<
      PureAbility<[ActionEnum, RootEntityClass<TypeormRealEntity> | string]>
    >(PureAbility);

    const permissionHandlers = BaseAccess.getAllPermissions();

    for (const handler of permissionHandlers) {
      handler.defineRules(user, abilityBuilder);
    }

    return new PureAbility<
      [ActionEnum, RootEntityClass<TypeormRealEntity> | string]
    >(abilityBuilder.rules);
  }
}
