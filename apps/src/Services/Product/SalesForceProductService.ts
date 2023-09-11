import { AxiosConfiguration } from 'apps/src/Config/AxiosConfiguration';
import { Logger } from 'apps/src/Config/LoggerConfig';
import SalesForceEndpointsEnum from 'apps/src/Enums/SalesForce/SalesForceEndpointsEnum';
import InterceptedAxios from 'apps/src/Helpers/Utilities/InterceptedAxios';
import SalesForceProduct from 'apps/src/Models/Product/SalesForceProduct';
import { SalesForceAuthService } from '../SalesForceAuthService';

export default class SalesForceProductService {
  public static async sendProductToSalesForce(
    products: SalesForceProduct[],
  ): Promise<void> {
    const authService: SalesForceAuthService = new SalesForceAuthService();
    const token: string = await authService.getToken();
    if (token === undefined) {
      return;
    }
    const url: string =
      process.env.SALESFORCE_BASE_COMPOSITE_URL +
      SalesForceEndpointsEnum.PRODUCT;

    const headers = {
      Authorization: `Bearer ${token}`,
      'Content-Type': 'application/json',
    };
    const body = {
      allOrNone: false,
      records: products,
    };

    try {
      await InterceptedAxios.patch(url, body, AxiosConfiguration(headers));
    } catch (error) {
      Logger.message.error(JSON.stringify(error));
    }
  }
}
