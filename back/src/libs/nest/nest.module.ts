import { Module } from '@nestjs/common';
import { APP_FILTER } from '@nestjs/core';
import { BaseExceptionFilter } from './interceptor/base-exception.interceptor';

@Module({
  providers: [
    {
      provide: APP_FILTER,
      useExisting: BaseExceptionFilter,
    },
    BaseExceptionFilter,
  ],
})
export class NestModule {}
