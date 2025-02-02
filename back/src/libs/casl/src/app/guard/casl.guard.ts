import {
  CanActivate,
  ExecutionContext,
  Injectable,
  ForbiddenException,
} from '@nestjs/common';
import { Request } from 'express';
import { CaslAbilityFactory } from '../../providers/factories/casl-ability.factory';
import { ActionEnum } from '../../providers/enum/action-enum';
import { ClsService } from 'nestjs-cls';
import { BaseController } from 'src/libs/nest/controller/base-controller.controller';
import { TypeormRealEntity } from 'src/libs/ORM/typeorm-real-entity/typeorm-real.entity';
import { RootEntityClass } from 'src/libs/ORM/root-entity/root-entity-class';

@Injectable()
export class CaslGuard implements CanActivate {
  constructor(
    private caslFactory: CaslAbilityFactory,
    private clsService: ClsService,
  ) {}

  canActivate(context: ExecutionContext): boolean {
    const request = context.switchToHttp().getRequest<Request>();
    const user = this.clsService.get('user');

    const entity = this.getEntityFromController(context);
    const action = this.mapHttpMethodToAction(request.method);

    if (!action || !entity) {
      throw new ForbiddenException(
        'Invalid request: Action or Entity is missing.',
      );
    }

    const ability = this.caslFactory.createForUser(user);

    if (!ability.can(action, entity)) {
      throw new ForbiddenException(
        `You do not have permission to ${action} the ${entity}.`,
      );
    }
    return true;
  }

  private mapHttpMethodToAction(method: string): ActionEnum | null {
    switch (method) {
      case 'POST':
        return ActionEnum.Create;
      case 'GET':
        return ActionEnum.Read;
      case 'PUT':
      case 'PATCH':
        return ActionEnum.Update;
      case 'DELETE':
        return ActionEnum.Delete;
      default:
        return null;
    }
  }

  private getEntityFromController(
    context: ExecutionContext,
  ): RootEntityClass<TypeormRealEntity> | string | null {
    const controller = context.getClass() as unknown as BaseController<any>;
    const entity = controller.getEntity();

    if (!entity) {
      throw new ForbiddenException('Entity not defined in the controller.');
    }

    return entity;
  }
}
