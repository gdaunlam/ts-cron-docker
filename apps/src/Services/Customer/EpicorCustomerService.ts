import { Injectable, HttpException } from '@nestjs/common';
import { AxiosConfiguration } from 'apps/src/Config/AxiosConfiguration';
import { Logger } from 'apps/src/Config/LoggerConfig';
import CreditHoldEnum from 'apps/src/Enums/Customer/CreditHoldEnu';
import EpicorEndpointsEnum from 'apps/src/Enums/Epicor/EpicorEndpointsEnum';
import SalesForceCustomerCompanyEnum from 'apps/src/Enums/SalesForce/SalesForceCustomerCompanyEnum';
import InterceptedAxios from 'apps/src/Helpers/Utilities/InterceptedAxios';
import PostCustomerRequest from 'apps/src/Models/Customer/Request/PostCustomerRequest';
import PostCustomersRequest from 'apps/src/Models/Customer/Request/PostCustomersRequest';
import { AxiosResponse } from 'axios';
import structuredClone from '@ungap/structured-clone';
Injectable();
export class EpicorCustomerService {
  public static async getCustomersFromEpicorByChangeDate(
    company: string,
  ): Promise<any> {
    const url: string =
      process.env.EPICOR_BASE_URL + company + EpicorEndpointsEnum.CUSTOMER_PULL;
    const headers = {
      'x-api-key': process.env.EPICOR_APIKEY,
      Authorization: process.env.EPICOR_AUTHORIZATION,
    };

    try {
      const customers = await InterceptedAxios.get(
        url,
        AxiosConfiguration(headers),
      );
      return customers;
    } catch (error) {
      Logger.message.error(JSON.stringify(error));
    }
  }

  public async createCustomers(
    allCustomers: PostCustomersRequest,
    _company: string,
  ): Promise<AxiosResponse> {
    const company: string = _company;
    const firstStepURL =
      process.env.EPICOR_BASE_URL +
      company +
      EpicorEndpointsEnum.FIRST_STEP_CUSTOMER;
    const url: string =
      process.env.EPICOR_BASE_URL + company + EpicorEndpointsEnum.CUSTOMER;
    const headers = {
      'x-api-key': process.env.EPICOR_APIKEY,
      Authorization: process.env.EPICOR_AUTHORIZATION,
      'Content-Type': 'application/json',
    };
    const body = {
      ds: {},
    };

    try {
      const firstStepResponse = await InterceptedAxios.post(
        firstStepURL,
        body,
        AxiosConfiguration(headers),
      );
      const payload = await this.mapFirstStageResponse(
        allCustomers.customers,
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

  private mapFirstStageResponse(
    customers: PostCustomerRequest[],
    body: any,
  ): any {
    const payload = structuredClone(body);
    const staticData = JSON.parse(
      JSON.stringify(body.parameters.ds.Customer[0]),
    );
    for (let i = 0; i < customers.length; i += 1) {
      payload.parameters.ds.Customer[i] = {
        ...staticData,
        Company: SalesForceCustomerCompanyEnum.AGRICULTURAL,
        CustID: customers[i].ID_Customer,
        CustNum: customers[i].Nro_Customer,
        Name: customers[i].Name,
        Address1: customers[i].Calle,
        Address2: String(customers[i].N_mero),
        Address3: customers[i].Colonia,
        City: customers[i].Ciudad,
        State: 'State',
        Zip: customers[i].Zip_C_P,
        ResaleID: customers[i].ID_Reventa,
        Country: customers[i].BTPa_s,
        TerritoryID: customers[i].ID_Zona,
        ShipViaCode: customers[i].Forma_de_entrega,
        PhoneNum: customers[i].Phone,
        CountryNum: Number(customers[i].Nro_Pais),
        TipoCustomer_c: 'UF',
        Subzona_c: '',
        BTName: customers[i].Nombre_de_facturaci_n,
        Character01: customers[i].Nombre_largo_fiscal,
        Comment: customers[i].Description,
        EstDate: customers[i].Fecha_de_fundaci_n,
        BTCity: customers[i].BTCiudad,
        BTAddress1: customers[i].BTCalle,
        BTZip: customers[i].BTZip_C_P,
        BTCountryNum: customers[i].BTNro_Pa_s,
        BTCountry: customers[i].BTPa_s,
        BTPhoneNum: customers[i].BTNro_Tel_fono,
        BTFaxNum: customers[i].BTNro_Fax,
        BillFrequency: customers[i].BillFrequency,
        CorreosCopia_c: customers[i].CorreosCopia,
        CreditHold: customers[i].CrediHold === CreditHoldEnum.SI ? true : false,
        FaxNum: customers[i].fax,
        TermsCode: '0D',
      };
    }
    return payload.parameters;
  }
}
