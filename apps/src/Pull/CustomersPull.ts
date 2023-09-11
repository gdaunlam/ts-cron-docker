import { Logger } from '../Config/LoggerConfig';
import CompanyEnum from '../Enums/Epicor/CompanyEnum';
import SalesForceAttributesEnum from '../Enums/SalesForce/SalesForceAttributesEnum';
import SalesForceCustomer from '../Models/Customer/SalesForceCustomer';
import SalesForceAttributes from '../Models/SalesForceAttributes';
import { EpicorCustomerService } from '../Services/Customer/EpicorCustomerService';
import { SalesForceCustomerService } from '../Services/Customer/SalesForceCustomerService';

export class CustomersPull {
  public static async pull(): Promise<void> {
    Logger.message.info('Running CustomersPull');

    for (const company of Object.values(CompanyEnum)) {
      await this.getAndSendCustomers(company);
    }
  }

  private static async getAndSendCustomers(company: string): Promise<void> {
    const response: any =
      await EpicorCustomerService.getCustomersFromEpicorByChangeDate(company);
    if (response) {
      Logger.message.info('Epicor Response');
      Logger.message.info(JSON.stringify(response.data));
      Logger.message.info('Epicor Response Status message');
      Logger.message.info(JSON.stringify(response.statusText));
    }
    const customers: SalesForceCustomer[] = [];
    const chunkSize = Number(process.env.SALESFORCE_APICALLS_MAX_CHUNK_SIZE);

    for (const customer of response.data.value) {
      customers.push(
        SalesForceCustomer.createFromEpicor(
          customer,
          SalesForceAttributes.create(SalesForceAttributesEnum.CUSTOMER),
          process.env.SALESFORCE__RECORD_TYPE_DISTRIBUIDOR,
        ),
      );
    }

    if (customers.length === 0) return;

    for (let i = 0; i < customers.length; i += chunkSize) {
      const customersChunk = customers.slice(i, i + chunkSize);
      if (customersChunk.length !== 0) {
        const sfResponse =
          await SalesForceCustomerService.sendCustomersToSalesForce(
            customersChunk,
          );
        if (sfResponse) {
          Logger.message.info('SalesForceResponse');
          Logger.message.info(JSON.stringify(sfResponse.data));
          Logger.message.info('SalesForceResponse Status');
          Logger.message.info(
            JSON.stringify(sfResponse.status) +
              JSON.stringify(sfResponse.statusText),
          );
        }
      }
    }
    return;
  }
}
