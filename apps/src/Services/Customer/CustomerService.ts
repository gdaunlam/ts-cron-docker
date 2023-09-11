import Customer from '../../Models/Customer/SalesForceCustomer';
import SalesForceAttributes from '../../Models/SalesForceAttributes';
import SalesForceAttributesEnum from '../../Enums/SalesForce/SalesForceAttributesEnum';
import SalesForceRecordTypeEnum from '../../Enums/SalesForce/SalesForceRecordTypeEnum';
import { Injectable, Scope } from '@nestjs/common';
import SalesForceCustomer from '../../Models/Customer/SalesForceCustomer';
import { EpicorCustomerService } from './EpicorCustomerService';
import PostCustomersRequest from 'apps/src/Models/Customer/Request/PostCustomersRequest';
import { Logger } from 'apps/src/Config/LoggerConfig';

@Injectable({ scope: Scope.REQUEST })
export class CustomerService {
  public constructor(
    private readonly epicorApiService: EpicorCustomerService,
  ) {}

  async sendCreateCustomers(
    allCustomers: PostCustomersRequest,
    company: string,
  ): Promise<SalesForceCustomer[]> {
    const updatedCustomers: Customer[] = [];
    const response = await this.epicorApiService.createCustomers(
      allCustomers,
      company,
    );
    Logger.message.info(`Epicor response: ${JSON.stringify(response.data)}`);
    Logger.message.info(`Epicor status: ${JSON.stringify(response.status)}`);
    for (const customer of response.data.parameters.ds.Customer) {
      updatedCustomers.push(
        Customer.createFromEpicor(
          customer,
          SalesForceAttributes.create(SalesForceAttributesEnum.CUSTOMER),
          '',
          //SalesForceRecordTypeEnum.DISTRIBUIDOR,
        ),
      );
    }

    return updatedCustomers;
  }
}
