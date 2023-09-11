import { Injectable, Scope } from '@nestjs/common';
import axios from 'axios';
import { Logger } from '../Config/LoggerConfig';

@Injectable({ scope: Scope.REQUEST })
export class SalesForceAuthService {
  async getToken(): Promise<string> {
    try {
      const response = await axios.post(
        `${process.env.SALESFORCE_AUTH_URL}?`,
        new URLSearchParams({
          grant_type: process.env.SALESFORCE_GRANT_TYPE,
          client_id: process.env.SALESFORCE_CLIENT_ID,
          client_secret: process.env.SALESFORCE_CLIENT_SECRET,
          username: process.env.SALESFORCE_USERNAME,
          password: process.env.SALESFORCE_PASSWORD,
        }),
      );
      return response.data.access_token;
    } catch (error) {
      Logger.message.error('Error al autenticarse en salesforce');
      return undefined;
    }
  }
}
