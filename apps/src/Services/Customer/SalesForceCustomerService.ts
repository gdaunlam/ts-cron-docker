import { AxiosConfiguration } from 'apps/src/Config/AxiosConfiguration';
import { Logger } from 'apps/src/Config/LoggerConfig';
import SalesForceEndpointsEnum from 'apps/src/Enums/SalesForce/SalesForceEndpointsEnum';
import InterceptedAxios from 'apps/src/Helpers/Utilities/InterceptedAxios';
import SalesForceCustomer from 'apps/src/Models/Customer/SalesForceCustomer';
import { SalesForceAuthService } from '../SalesForceAuthService';

export class SalesForceCustomerService {
  public static async sendCustomersToSalesForce(
    customers: SalesForceCustomer[],
  ): Promise<any> {
    const authService: SalesForceAuthService = new SalesForceAuthService();
    const token: string = await authService.getToken();
    if (token === undefined) {
      return;
    }
    const url: string =
      process.env.SALESFORCE_BASE_COMPOSITE_URL +
      SalesForceEndpointsEnum.CUSTOMER;

    const headers = {
      Authorization: `Bearer ${token}`,
      'Content-Type': 'application/json',
    };

    const body = {
      allOrNone: false,
      records: customers,
    };

    try {
      await InterceptedAxios.patch(url, body, AxiosConfiguration(headers));
    } catch (error) {
      Logger.message.error(JSON.stringify(error));
    }
  }
}
