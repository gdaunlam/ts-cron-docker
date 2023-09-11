import CompanyEnum from 'apps/src/Enums/Epicor/CompanyEnum';
import SalesForceProduct from 'apps/src/Models/Product/SalesForceProduct';
import { Logger } from '../Config/LoggerConfig';
import { EpicorProductService } from '../Services/Product/EpicorProductService';
import SalesForceProductService from '../Services/Product/SalesForceProductService';
import SalesForceAttributes from '../Models/SalesForceAttributes';
import SalesForceAttributesEnum from '../Enums/SalesForce/SalesForceAttributesEnum';

export class ProductsPull {
  public static async pull(): Promise<void> {
    const dummyDate = new Date(); //'1900-01-01T00:00:00.000Z';
    const filterDate: string = dummyDate.toISOString();

    Logger.message.info('Running ProductsPull');

    /*if (!pullAll) {
      const yesterdayDate = new Date();
      yesterdayDate.setDate(yesterdayDate.getDate() - 1);
      filterDate = yesterdayDate.toISOString();
    }*/

    for (const company of Object.values(CompanyEnum)) {
      await this.getAndSendProducts(company);
    }
  }

  private static async getAndSendProducts(company: string): Promise<void> {
    const responseValues: any =
      await EpicorProductService.getActiveProductsFromEpicorByDate(company);
    if (responseValues) {
      Logger.message.info('Epicor Response');
      Logger.message.info(JSON.stringify(responseValues.data));
      Logger.message.info('Epicor Response Status');
      Logger.message.info(JSON.stringify(responseValues.status));
      Logger.message.info('Epicor Response Status message');
      Logger.message.info(JSON.stringify(responseValues.statusText));

      const products: SalesForceProduct[] = [];
      const chunkSize = Number(process.env.SALESFORCE_APICALLS_MAX_CHUNK_SIZE);

      for (const product of responseValues.data.value) {
        products.push(
          SalesForceProduct.createFromEpicor(
            product,
            SalesForceAttributes.create(SalesForceAttributesEnum.PRODUCT),
          ),
        );
      }

      if (products.length === 0) return;

      for (let i = 0; i < products.length; i += chunkSize) {
        const productChunk = products.slice(i, i + chunkSize);
        if (productChunk.length !== 0) {
          await SalesForceProductService.sendProductToSalesForce(productChunk);
        }
      }
      return;
    }
  }
}
