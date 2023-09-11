import { Command } from 'nestjs-command';
import { Injectable } from '@nestjs/common';
import { Logger } from '../Config/LoggerConfig';
import { SetUuid } from '../Helpers/Decorators/UuidDecorator';
import { CustomersPull } from '../Pull/CustomersPull';

@Injectable()
@SetUuid()
export class CustomersPullCommand {
  @Command({
    command: 'pull:Customers',
    describe: 'command Customers pull',
  })
  async CustomersPullCommand() {
    Logger.message.info(`Executing command: pull:Customers`);
    Logger.message.info(`Pulling All: true`);
    await CustomersPull.pull();
    Logger.message.info(`Command executed!`);
    return;
  }
}
