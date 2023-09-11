import { Command } from 'nestjs-command';
import { Injectable } from '@nestjs/common';
import { Logger } from '../Config/LoggerConfig';
import { SetUuid } from '../Helpers/Decorators/UuidDecorator';
import { ShipToesPull } from '../Pull/ShipToesPull';

@Injectable()
@SetUuid()
export class ShipToesPullCommand {
  @Command({
    command: 'pull:ShipToes',
    describe: 'command ShipToes pull',
  })
  async ShipToesPullCommand() {
    Logger.message.info(`Executing command: pull:ShipToes`);
    Logger.message.info(`Pulling All`);
    await ShipToesPull.pull();
    Logger.message.info(`Command executed!`);
    return;
  }
}
