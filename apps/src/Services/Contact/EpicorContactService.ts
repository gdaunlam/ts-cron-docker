import { Injectable, HttpException } from '@nestjs/common';
import { AxiosConfiguration } from 'apps/src/Config/AxiosConfiguration';
import { Logger } from 'apps/src/Config/LoggerConfig';
import EpicorEndpointsEnum from 'apps/src/Enums/Epicor/EpicorEndpointsEnum';
import InterceptedAxios from 'apps/src/Helpers/Utilities/InterceptedAxios';
import PostContactRequest from 'apps/src/Models/Contact/Request/PostContactRequest';
import { AxiosResponse } from 'axios';
import structuredClone from '@ungap/structured-clone';

Injectable();
export class EpicorContactService {
  public static async getContactsFromEpicorByChangeDate(
    company: string,
  ): Promise<any> {
    const url: string =
      process.env.EPICOR_BASE_URL + company + EpicorEndpointsEnum.CONTACT_PULL;
    const headers = {
      'x-api-key': process.env.EPICOR_APIKEY,
      Authorization: process.env.EPICOR_AUTHORIZATION,
    };

    try {
      const contacts = await InterceptedAxios.get(
        url,
        AxiosConfiguration(headers),
      );
      return contacts;
    } catch (error) {
      Logger.message.error(JSON.stringify(error));
    }
  }

  public async createContact(
    contact: PostContactRequest,
    _company: string,
  ): Promise<AxiosResponse> {
    const company: string = _company;
    const firstStepURL =
      process.env.EPICOR_BASE_URL +
      company +
      EpicorEndpointsEnum.FIRST_STEP_CONTACT;
    const url: string =
      process.env.EPICOR_BASE_URL + company + EpicorEndpointsEnum.CONTACT;
    const headers = {
      'x-api-key': process.env.EPICOR_APIKEY,
      Authorization: process.env.EPICOR_AUTHORIZATION,
      'Content-Type': 'application/json',
    };

    try {
      const firstStepBody = {
        ds: {},
        custNum: contact.CustNum,
        shipToNum: '',
      };
      const firstStepResponse = await InterceptedAxios.post(
        firstStepURL,
        firstStepBody,
        AxiosConfiguration(headers),
      );
      const payload = await this.mapFirstStageResponse(
        contact,
        firstStepResponse.data,
      );
      const epicorResponse = await InterceptedAxios.post(
        url,
        payload,
        AxiosConfiguration(headers),
      );
      return epicorResponse;
    } catch (error) {
      throw new HttpException(
        JSON.stringify(error.response.data),
        error.response.status,
      );
    }
  }
  private mapFirstStageResponse(contact: PostContactRequest, body: any): any {
    const payload = structuredClone(body);
    const staticData = JSON.parse(
      JSON.stringify(body.parameters.ds.CustCnt[0]),
    );
    payload.parameters.ds.CustCnt[0] = {
      ...staticData,
      Name: `${contact.FirstName} ${contact.MiddleName} ${contact.LastName}`,
      FirstName: contact.FirstName,
      MiddleName: contact.MiddleName,
      LastName: contact.LastName,
      Company: contact.Company,
      CustNum: contact.CustNum,
      EMailAddress: contact.Email,
      PhoneNum: contact.Phone,
      Inactive: contact.Activo,
    };
    return payload.parameters;
  }
}
