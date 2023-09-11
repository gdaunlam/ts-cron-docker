import { Module } from '@nestjs/common';
import { APP_FILTER } from '@nestjs/core';
import { CommandModule } from 'nestjs-command';
import { QueryFailedErrorFilter } from './Middleware/QueryFailedErrorFilter';
import { ConfigModule } from '@nestjs/config';
import { nestEnvConfiguration } from './Config/NestEnvConfiguration';
import { envFilePathConfiguration } from './Config/EnvFilePathConfiguration';
import { CustomCommandModule } from './Modules/CustomCommmandModule';

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: [envFilePathConfiguration()],
      load: [nestEnvConfiguration],
      isGlobal: true,
    }),
    CommandModule,
    CustomCommandModule,
  ],
  providers: [{ provide: APP_FILTER, useClass: QueryFailedErrorFilter }],
})
export class CommModule {}
