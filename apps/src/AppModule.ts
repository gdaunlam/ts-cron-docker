import { MiddlewareConsumer, Module } from '@nestjs/common';
import { AppTestModule } from './Modules/InnovakIntegrationModule';
import { ConfigModule } from '@nestjs/config';
import { nestEnvConfiguration } from './Config/NestEnvConfiguration';
import { envFilePathConfiguration } from './Config/EnvFilePathConfiguration';
import { APP_INTERCEPTOR } from '@nestjs/core';
import { LoggingInterceptor } from './Middleware/LoggingInterceptor';

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: [envFilePathConfiguration()],
      load: [nestEnvConfiguration],
      isGlobal: true,
    }),
    AppTestModule,
  ],
  providers: [{ provide: APP_INTERCEPTOR, useClass: LoggingInterceptor }],
})
export class AppModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply().forRoutes('*');
  }
}
