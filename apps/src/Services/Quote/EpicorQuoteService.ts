import { Injectable, HttpException } from '@nestjs/common';
import { AxiosConfiguration } from 'apps/src/Config/AxiosConfiguration';
import { Logger } from 'apps/src/Config/LoggerConfig';
import EpicorEndpointsEnum from 'apps/src/Enums/Epicor/EpicorEndpointsEnum';
import InterceptedAxios from 'apps/src/Helpers/Utilities/InterceptedAxios';
import PostQuoteRequest from 'apps/src/Models/Quote/Request/PostQuoteRequest';
import { AxiosResponse } from 'axios';
Injectable();
export class EpicorQuoteService {
  public async createQuote(
    quote: PostQuoteRequest,
    company: string,
  ): Promise<AxiosResponse> {
    const firstStepURL: string =
      process.env.EPICOR_BASE_URL +
      company +
      EpicorEndpointsEnum.QUOTE_FIRST_STEP;
    const secondStepURL: string =
      process.env.EPICOR_BASE_URL +
      company +
      EpicorEndpointsEnum.QUOTE_LAST_STEP;
    const headers = {
      'x-api-key': process.env.EPICOR_APIKEY,
      Authorization: process.env.EPICOR_AUTHORIZATION,
      'Content-Type': 'application/json',
    };

    try {
      const firstStepResponse = await InterceptedAxios.post(
        firstStepURL,
        quote,
        AxiosConfiguration(headers),
      );
      const firstStepData = firstStepResponse.data.parameters.ds.UD16[0];
      if (firstStepData.Folio_c === '' || firstStepData.IdEmpleado_c === '') {
        throw new HttpException(
          'Didnt get expected response on first step',
          500,
        );
      }
      const secondStepData = {
        ds: {
          UD16: [firstStepData],
          UD16Attch: [] as any,
          ExtensionTables: [] as any,
        },
      };
      const secondStepResponse = await InterceptedAxios.post(
        secondStepURL,
        secondStepData,
        AxiosConfiguration(headers),
      );
      return secondStepResponse;
    } catch (error) {
      Logger.message.error(error);
      throw new HttpException(
        JSON.stringify(error.response.data),
        error.response.status,
      );
    }
  }
  public async getQuotesFromEpicor(
    company: string,
    empId: number,
  ): Promise<any> {
    const url: string =
      process.env.EPICOR_BASE_URL +
      company +
      EpicorEndpointsEnum.QUOTE_PULL +
      '?idEmp=' +
      empId;
    const headers = {
      'x-api-key': process.env.EPICOR_APIKEY,
      Authorization: process.env.EPICOR_AUTHORIZATION,
    };

    try {
      const quotes = await InterceptedAxios.get(
        url,
        AxiosConfiguration(headers),
      );
      return quotes;
    } catch (error) {
      Logger.message.error(JSON.stringify(error));
    }
  }
}
