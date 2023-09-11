import { Injectable } from '@nestjs/common';
import { AxiosConfiguration } from 'apps/src/Config/AxiosConfiguration';
import { Logger } from 'apps/src/Config/LoggerConfig';
import EpicorEndpointsEnum from 'apps/src/Enums/Epicor/EpicorEndpointsEnum';
import InterceptedAxios from 'apps/src/Helpers/Utilities/InterceptedAxios';

Injectable();
export class EpicorPriceListPartsService {
  public static async getPriceListsFromEpicor(company: string): Promise<any> {
    const url: string =
      process.env.EPICOR_BASE_URL + company + EpicorEndpointsEnum.PRICE_LIST;
    const headers = {
      'x-api-key': process.env.EPICOR_APIKEY,
      Authorization: process.env.EPICOR_AUTHORIZATION,
    };

    try {
      const priceList = await InterceptedAxios.get(
        url,
        AxiosConfiguration(headers),
      );
      return priceList;
    } catch (error) {
      Logger.message.error(JSON.stringify(error));
    }
  }

  public static async getPriceListPartsFromEpicor(
    company: string,
    listCodes: string[],
  ): Promise<any> {
    for (const code of listCodes) {
      const url: string =
        process.env.EPICOR_BASE_URL +
        company +
        EpicorEndpointsEnum.PRICE_LIST_NEW +
        code;
      const headers = {
        'x-api-key': process.env.EPICOR_APIKEY,
        Authorization: process.env.EPICOR_AUTHORIZATION,
      };

      try {
        const priceListParts = await InterceptedAxios.get(
          url,
          AxiosConfiguration(headers),
        );
        return priceListParts;
      } catch (error) {
        Logger.message.error(JSON.stringify(error));
      }
    }
  }
}
