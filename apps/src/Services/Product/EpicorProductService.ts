import { Injectable } from '@nestjs/common';
import { AxiosConfiguration } from 'apps/src/Config/AxiosConfiguration';
import { Logger } from 'apps/src/Config/LoggerConfig';
import EpicorEndpointsEnum from 'apps/src/Enums/Epicor/EpicorEndpointsEnum';
import InterceptedAxios from 'apps/src/Helpers/Utilities/InterceptedAxios';
Injectable();
export class EpicorProductService {
  public static async getActiveProductsFromEpicorByDate(
    company: string,
  ): Promise<any> {
    const url: string =
      process.env.EPICOR_BASE_URL + company + EpicorEndpointsEnum.PRODUCT;

    const headers = {
      'x-api-key': process.env.EPICOR_APIKEY,
      Authorization: process.env.EPICOR_AUTHORIZATION,
    };

    let responseValues: any;

    try {
      responseValues = await InterceptedAxios.get(
        url,
        AxiosConfiguration(headers),
      );
      return responseValues;
    } catch (error) {
      Logger.message.error(JSON.stringify(error));
    }
  }
}
