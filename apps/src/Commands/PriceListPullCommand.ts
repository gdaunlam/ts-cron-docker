import { Command } from 'nestjs-command';
import { Injectable } from '@nestjs/common';
import { Logger } from '../Config/LoggerConfig';
import { SetUuid } from '../Helpers/Decorators/UuidDecorator';
import { PriceListsPull } from '../Pull/PriceListPull';

@Injectable()
@SetUuid()
export class PriceListPullCommand {
  @Command({
    command: 'pull:PriceList',
    describe: 'command PriceList pull',
  })
  async PriceListPullCommand() {
    Logger.message.info(`Executing command: pull:PriceList`);
    Logger.message.info(`Pulling All: true `);
    await PriceListsPull.pull();
    Logger.message.info(`Command executed!`);
    return;
  }
}
