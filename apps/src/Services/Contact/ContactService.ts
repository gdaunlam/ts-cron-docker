import SalesForceAttributes from '../../Models/SalesForceAttributes';
import SalesForceAttributesEnum from '../../Enums/SalesForce/SalesForceAttributesEnum';
import SalesForceRecordTypeEnum from '../../Enums/SalesForce/SalesForceRecordTypeEnum';
import { Injectable, Scope } from '@nestjs/common';
import SalesForceContact from '../../Models/Contact/SalesForceContact';
import { EpicorContactService } from './EpicorContactService';
import PostContactsRequest from 'apps/src/Models/Contact/Request/PostContactsRequest';
import { Logger } from 'apps/src/Config/LoggerConfig';
@Injectable({ scope: Scope.REQUEST })
export class ContactService {
  public constructor(private readonly epicorApiService: EpicorContactService) {}

  async sendCreateContacts(
    allContacts: PostContactsRequest,
    company: string,
  ): Promise<SalesForceContact[]> {
    const updatedContacts: SalesForceContact[] = [];
    for (const contact of allContacts.contacts) {
      const response = await this.epicorApiService.createContact(
        contact,
        company,
      );
      Logger.message.info(`Epicor response: ${JSON.stringify(response.data)}`);
      Logger.message.info(`Epicor status: ${JSON.stringify(response.status)}`);
      updatedContacts.push(
        SalesForceContact.createFromEpicor(
          response.data.parameters.ds.CustCnt[0],
          SalesForceAttributes.create(SalesForceAttributesEnum.CONTACT),
          '',
          //SalesForceRecordTypeEnum.AGRICOLA,
        ),
      );
    }
    return updatedContacts;
  }
}
