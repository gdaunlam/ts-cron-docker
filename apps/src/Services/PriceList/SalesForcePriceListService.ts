import { AxiosConfiguration } from 'apps/src/Config/AxiosConfiguration';
import { Logger } from 'apps/src/Config/LoggerConfig';
import SalesForceEndpointsEnum from 'apps/src/Enums/SalesForce/SalesForceEndpointsEnum';
import InterceptedAxios from 'apps/src/Helpers/Utilities/InterceptedAxios';
import SalesForcePriceListSellOutHeader from 'apps/src/Models/PriceList/SalesForcePriceListSellOutHeader';
import { SalesForceAuthService } from '../SalesForceAuthService';
import { HttpException, HttpStatus } from '@nestjs/common';
import SalesForcePriceListSellOutPBE from 'apps/src/Models/PriceList/SalesForcePriceListSellOutPBE';

export default class SalesForcePriceListService {
  public static async sendPriceBookToSalesForce(
    list: SalesForcePriceListSellOutHeader[],
  ): Promise<void> {
    const authService: SalesForceAuthService = new SalesForceAuthService();
    const token: string = await authService.getToken();
    if (token === undefined) {
      return;
    }
    const url: string =
      process.env.SALESFORCE_BASE_COMPOSITE_URL +
      SalesForceEndpointsEnum.PRICEBOOK_HEADER;

    const headers = {
      Authorization: `Bearer ${token}`,
      'Content-Type': 'application/json',
    };
    const body = {
      allOrNone: false,
      records: list,
    };

    console.log(JSON.stringify(body) + 'chuuuuuuuuuuuuunk');

    try {
      await InterceptedAxios.patch(url, body, AxiosConfiguration(headers));
      console.log('patch');
    } catch (error) {
      if (error.response) {
        const { data, status } = error.response;
        Logger.message.error(
          `Salesforce error: ${status} ${JSON.stringify(data)}`,
        );
        throw new HttpException(
          {
            status,
            data: data,
          },
          status,
        );
      } else {
        Logger.message.error(`Error en postPayments: ${error}`);
        throw new HttpException(
          {
            status: HttpStatus.FORBIDDEN,
            data: error,
          },
          HttpStatus.FORBIDDEN,
        );
      }
    }
  }
  public static async sendPriceBookEntriesToSalesForce(
    list: SalesForcePriceListSellOutPBE[],
  ): Promise<void> {
    const authService: SalesForceAuthService = new SalesForceAuthService();
    const token: string = await authService.getToken();
    if (token === undefined) {
      return;
    }
    const url: string =
      process.env.SALESFORCE_BASE_WS_URL +
      SalesForceEndpointsEnum.PRICEBOOK_PBE;

    const headers = {
      Authorization: `Bearer ${token}`,
      'Content-Type': 'application/json',
    };

    try {
      await InterceptedAxios.put(url, list, AxiosConfiguration(headers));
      console.log('patch');
    } catch (error) {
      if (error.response) {
        const { data, status } = error.response;
        Logger.message.error(
          `Salesforce error: ${status} ${JSON.stringify(data)}`,
        );
        throw new HttpException(
          {
            status,
            data: data,
          },
          status,
        );
      } else {
        Logger.message.error(`Error en postPayments: ${error}`);
        throw new HttpException(
          {
            status: HttpStatus.FORBIDDEN,
            data: error,
          },
          HttpStatus.FORBIDDEN,
        );
      }
    }
  }
}
