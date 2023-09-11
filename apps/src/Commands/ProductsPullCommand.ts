import { Command } from 'nestjs-command';
import { Injectable } from '@nestjs/common';
import { Logger } from '../Config/LoggerConfig';
import { SetUuid } from '../Helpers/Decorators/UuidDecorator';
import { ProductsPull } from '../Pull/ProductsPull';

@Injectable()
@SetUuid()
export class ProductsPullCommand {
  @Command({
    command: 'pull:Products',
    describe: 'command Products pull',
  })
  async ProductsPullCommand() {
    Logger.message.info(`Executing command: pull:Products`);
    Logger.message.info(`Pulling All: true`);
    await ProductsPull.pull();
    Logger.message.info(`Command executed!`);
    return;
  }
}
