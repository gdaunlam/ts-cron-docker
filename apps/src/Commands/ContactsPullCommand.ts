import { Command } from 'nestjs-command';
import { Injectable } from '@nestjs/common';
import { Logger } from '../Config/LoggerConfig';
import { SetUuid } from '../Helpers/Decorators/UuidDecorator';
import { ContactsPull } from '../Pull/ContactsPull';

@Injectable()
@SetUuid()
export class ContactsPullCommand {
  @Command({
    command: 'pull:contacts',
    describe: 'command contacts pull',
  })
  async contactsPullCommand() {
    Logger.message.info(`Executing command: pull:contacts`);
    await ContactsPull.pull();
    Logger.message.info(`Command executed!`);
    return;
  }
}
