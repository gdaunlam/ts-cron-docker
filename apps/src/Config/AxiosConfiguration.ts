import { AxiosRequestConfig } from 'axios';
import * as rax from 'retry-axios';
import EnumHttpCodes from '../Enums/EnumHttpCodes';

// eslint-disable-next-line @typescript-eslint/ban-types
export const AxiosConfiguration = (headers: Object, body?: Object): AxiosRequestConfig => {
  rax.attach();
  return {
    raxConfig: {
      httpMethodsToRetry: ['GET', 'POST', 'PUT', 'DELETE'],
      shouldRetry: (err) => {
        const cfg = rax.getConfig(err);
        if (cfg.currentRetryAttempt < 3) {
          return err?.code == EnumHttpCodes.ERROR_CONN_ABORTED || err.response?.status == EnumHttpCodes.TIME_OUT;
        } else {
          return false;
        }
      },
    },
    headers: headers,
    data: body ? body : null,
    timeout: Number(process.env.EPICOR_API_TIMEOUT),
    proxy: false,
  };
};
