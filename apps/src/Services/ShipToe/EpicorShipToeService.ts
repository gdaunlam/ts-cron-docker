import { Injectable } from '@nestjs/common';
import { AxiosConfiguration } from 'apps/src/Config/AxiosConfiguration';
import { Logger } from 'apps/src/Config/LoggerConfig';
import EpicorEndpointsEnum from 'apps/src/Enums/Epicor/EpicorEndpointsEnum';
import InterceptedAxios from 'apps/src/Helpers/Utilities/InterceptedAxios';
Injectable();
export class EpicorShipToeService {
  public static async getShipToesFromEpicorByChangeDate(
    company: string,
  ): Promise<any> {
    const url: string =
      process.env.EPICOR_BASE_URL + company + EpicorEndpointsEnum.SHIPTOE;
    const headers = {
      'x-api-key': process.env.EPICOR_APIKEY,
      Authorization: process.env.EPICOR_AUTHORIZATION,
    };

    try {
      const shipToes = await InterceptedAxios.get(
        url,
        AxiosConfiguration(headers),
      );
      return shipToes;
    } catch (error) {
      Logger.message.error(JSON.stringify(error));
    }
  }
}
