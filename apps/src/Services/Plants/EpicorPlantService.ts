import { Injectable } from '@nestjs/common';
import { AxiosConfiguration } from 'apps/src/Config/AxiosConfiguration';
import { Logger } from 'apps/src/Config/LoggerConfig';
import EpicorEndpointsEnum from 'apps/src/Enums/Epicor/EpicorEndpointsEnum';
import InterceptedAxios from 'apps/src/Helpers/Utilities/InterceptedAxios';

Injectable();
export class EpicorPlantService {
  public static async getPlantsFromEpicor(company: string): Promise<any> {
    const url: string =
      process.env.EPICOR_BASE_URL + company + EpicorEndpointsEnum.PLANT;
    const headers = {
      'x-api-key': process.env.EPICOR_APIKEY,
      Authorization: process.env.EPICOR_AUTHORIZATION,
    };

    try {
      const plants = await InterceptedAxios.get(
        url,
        AxiosConfiguration(headers),
      );
      return plants;
    } catch (error) {
      Logger.message.error(JSON.stringify(error));
    }
  }
}
