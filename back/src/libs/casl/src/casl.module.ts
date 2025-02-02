import { Module } from '@nestjs/common';
import { CaslAbilityFactory } from './providers/factories/casl-ability.factory';
import { CaslGuard } from './app/guard/casl.guard';
import { APP_GUARD } from '@nestjs/core';
import { ClsModule } from 'nestjs-cls';

@Module({
  imports: [ClsModule],
  providers: [CaslAbilityFactory, { provide: APP_GUARD, useClass: CaslGuard }],
  exports: [CaslAbilityFactory],
})
export class CaslModule {}
