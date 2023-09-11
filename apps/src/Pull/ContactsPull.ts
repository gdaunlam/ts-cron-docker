import { Logger } from '../Config/LoggerConfig';
import CompanyEnum from '../Enums/Epicor/CompanyEnum';
import SalesForceAttributesEnum from '../Enums/SalesForce/SalesForceAttributesEnum';
import SalesForceContact from '../Models/Contact/SalesForceContact';
import SalesForceAttributes from '../Models/SalesForceAttributes';
import { EpicorContactService } from '../Services/Contact/EpicorContactService';
import { SalesForceContactService } from '../Services/Contact/SalesForceContactService';

export class ContactsPull {
  public static async pull(): Promise<void> {
    Logger.message.info('Running ContactsPull');
    const companyValues: string[] = Object.values(CompanyEnum);

    for (const company of companyValues) {
      await this.getAndSendContacts(company);
    }
  }

  private static async getAndSendContacts(company: string): Promise<void> {
    const response: any =
      await EpicorContactService.getContactsFromEpicorByChangeDate(company);
    if (response) {
      Logger.message.info('Epicor Response');
      Logger.message.info(JSON.stringify(response.data));
      Logger.message.info('Epicor Response Status');
      Logger.message.info(JSON.stringify(response.status));
      Logger.message.info('Epicor Response Status message');
      Logger.message.info(JSON.stringify(response.statusText));
    }
    const contacts: SalesForceContact[] = [];
    const chunkSize = Number(process.env.SALESFORCE_APICALLS_MAX_CHUNK_SIZE);

    for (const contact of response.data.value) {
      contacts.push(
        SalesForceContact.createFromEpicor(
          contact,
          SalesForceAttributes.create(SalesForceAttributesEnum.CONTACT),
          process.env.SALESFORCE__RECORD_TYPE_CONTACTO_DISTRIBUIDOR,
        ),
      );
    }

    if (contacts.length === 0) return;
    for (let i = 0; i < contacts.length; i += chunkSize) {
      const contactsChunk = contacts.slice(i, i + chunkSize);
      if (contactsChunk.length !== 0) {
        const sfResponse =
          await SalesForceContactService.sendContactsToSalesForce(
            contactsChunk,
          );
        if (sfResponse) {
          Logger.message.info('SalesForceResponse');
          Logger.message.info(JSON.stringify(sfResponse.data));
          Logger.message.info('SalesForceResponse Status');
          Logger.message.info(JSON.stringify(sfResponse.status));
          Logger.message.info('Salesforce Response Status message');
          Logger.message.info(JSON.stringify(sfResponse.statusText));
        }
      }
    }
    return;
  }
}
