import { NestFactory } from '@nestjs/core';
import { CommModule } from '../src/CommandModule';
import { CommandModule, CommandService } from 'nestjs-command';

async function bootstrap() {
  const app = await NestFactory.createApplicationContext(CommModule, {
    logger: ['error'], // only errors
  });

  try {
    await app.select(CommandModule).get(CommandService).exec();
    await app.close();
    process.exit(0);
  } catch (error) {
    console.error(`Command execution error: ${error}`);
    await app.close();
    process.exit(1);
  }
}

bootstrap();
