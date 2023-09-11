import { Command } from 'nestjs-command';
import { Injectable } from '@nestjs/common';
import { Logger } from '../Config/LoggerConfig';
import { SetUuid } from '../Helpers/Decorators/UuidDecorator';
import { PlantsPull } from '../Pull/PlantsPull';

@Injectable()
@SetUuid()
export class PlantsPullCommand {
  @Command({
    command: 'pull:Plants',
    describe: 'command Plants pull',
  })
  async PlantsPullCommand() {
    Logger.message.info(`Executing command: pull:Plants`);
    Logger.message.info(`Pulling All: true`);
    await PlantsPull.pull();
    Logger.message.info(`Command executed!`);
    return;
  }
}
