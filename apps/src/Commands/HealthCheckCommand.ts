import { Command, Positional } from 'nestjs-command';
import { Injectable } from '@nestjs/common';
import { Logger } from '../Config/LoggerConfig';
import { SetUuid } from '../Helpers/Decorators/UuidDecorator';

@Injectable()
@SetUuid()
export class HealthCheckCommand {
  @Command({
    command: 'test:hello <username>',
    describe: 'command test',
  })
  async helloWorldCommand(
    @Positional({
      name: 'username',
      describe: 'the username',
      type: 'string',
    })
    username: string,
  ) {
    Logger.message.info(`Executing command: test:hello ${username}`);
    Logger.message.info(username ? `Hello ${username}!` : 'Hello world');
    Logger.message.info(`Command executed!`);
    return;
  }
}
