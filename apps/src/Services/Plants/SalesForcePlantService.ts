import { AxiosConfiguration } from 'apps/src/Config/AxiosConfiguration';
import { Logger } from 'apps/src/Config/LoggerConfig';
import SalesForceEndpointsEnum from 'apps/src/Enums/SalesForce/SalesForceEndpointsEnum';
import InterceptedAxios from 'apps/src/Helpers/Utilities/InterceptedAxios';
import SalesForcePlant from 'apps/src/Models/Plants/SalesForcePlant';
import SalesForcePlantZone from 'apps/src/Models/Plants/SalesForcePlantZone';
import { SalesForceAuthService } from '../SalesForceAuthService';
export class SalesForcePlantService {
  public static async sendPlantsToSalesForce(
    plants: SalesForcePlant,
  ): Promise<any> {
    const authService: SalesForceAuthService = new SalesForceAuthService();
    const token: string = await authService.getToken();
    if (token === undefined) {
      return;
    }
    const url: string =
      process.env.SALESFORCE_BASE_COMPOSITE_URL + SalesForceEndpointsEnum.PLANT;

    const headers = {
      Authorization: `Bearer ${token}`,
      'Content-Type': 'application/json',
    };

    const body = {
      allOrNone: false,
      records: [plants],
    };

    try {
      return InterceptedAxios.patch(url, body, AxiosConfiguration(headers));
    } catch (error) {
      Logger.message.error(JSON.stringify(error));
    }
  }

  public static async sendZonesToSalesForce(
    zones: SalesForcePlantZone,
  ): Promise<any> {
    const authService: SalesForceAuthService = new SalesForceAuthService();
    const token: string = await authService.getToken();
    if (token === undefined) {
      return;
    }
    const url: string =
      process.env.SALESFORCE_BASE_COMPOSITE_URL +
      SalesForceEndpointsEnum.PLANT_ZONE;

    const headers = {
      Authorization: `Bearer ${token}`,
      'Content-Type': 'application/json',
    };

    const body = {
      allOrNone: false,
      records: [zones],
    };

    try {
      return InterceptedAxios.patch(url, body, AxiosConfiguration(headers));
    } catch (error) {
      Logger.message.error(JSON.stringify(error));
    }
  }
}
