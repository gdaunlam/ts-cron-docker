import { Module } from '@nestjs/common';
import { APP_FILTER, APP_INTERCEPTOR } from '@nestjs/core';
import { importAllFromRequireContext } from '../Helpers/Utilities/ImportAllFromRequireContext';
import { HttpExceptionFilter } from '../Middleware/HttpExceptionFilter';
import { LoggingInterceptor } from '../Middleware/LoggingInterceptor';

@Module({
  providers: [
    { provide: APP_FILTER, useClass: HttpExceptionFilter },
    { provide: APP_INTERCEPTOR, useClass: LoggingInterceptor },
    ...importAllFromRequireContext(require.context('../Commands/', true)),
    ...importAllFromRequireContext(require.context('../Services/', true)),
  ],
})
export class CustomCommandModule {}
