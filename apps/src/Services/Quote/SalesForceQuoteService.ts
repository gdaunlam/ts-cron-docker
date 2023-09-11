import { AxiosConfiguration } from 'apps/src/Config/AxiosConfiguration';
import { Logger } from 'apps/src/Config/LoggerConfig';
import SalesForceEndpointsEnum from 'apps/src/Enums/SalesForce/SalesForceEndpointsEnum';
import InterceptedAxios from 'apps/src/Helpers/Utilities/InterceptedAxios';
import SalesForceQuote from 'apps/src/Models/Quote/SalesForceQuote';
import { SalesForceAuthService } from '../SalesForceAuthService';

export class SalesForceQuoteService {
  public static async sendContactsToSalesForce(
    quotes: SalesForceQuote,
  ): Promise<any> {
    const authService: SalesForceAuthService = new SalesForceAuthService();
    const token: string = await authService.getToken();
    if (token === undefined) {
      return;
    }
    const url: string =
      process.env.SALESFORCE_BASE_URL + SalesForceEndpointsEnum.QUOTE;

    const headers = {
      Authorization: `Bearer ${token}`,
      'Content-Type': 'application/json',
    };
    try {
      return await InterceptedAxios.post(
        url,
        quotes,
        AxiosConfiguration(headers),
      );
    } catch (error) {
      Logger.message.error(JSON.stringify(error));
    }
  }
}
