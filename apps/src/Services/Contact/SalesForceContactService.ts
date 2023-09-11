import { AxiosConfiguration } from 'apps/src/Config/AxiosConfiguration';
import { Logger } from 'apps/src/Config/LoggerConfig';
import SalesForceEndpointsEnum from 'apps/src/Enums/SalesForce/SalesForceEndpointsEnum';
import InterceptedAxios from 'apps/src/Helpers/Utilities/InterceptedAxios';
import SalesForceContact from 'apps/src/Models/Contact/SalesForceContact';
import { SalesForceAuthService } from '../SalesForceAuthService';

export class SalesForceContactService {
  public static async sendContactsToSalesForce(
    contacts: SalesForceContact[],
  ): Promise<any> {
    const authService: SalesForceAuthService = new SalesForceAuthService();
    const token: string = await authService.getToken();
    if (token === undefined) {
      return;
    }
    const url: string =
      process.env.SALESFORCE_BASE_COMPOSITE_URL +
      SalesForceEndpointsEnum.CONTACT;

    const headers = {
      Authorization: `Bearer ${token}`,
      'Content-Type': 'application/json',
    };

    const body = {
      allOrNone: false,
      records: contacts,
    };

    try {
      return await InterceptedAxios.patch(
        url,
        body,
        AxiosConfiguration(headers),
      );
    } catch (error) {
      Logger.message.error(JSON.stringify(error));
    }
  }
}