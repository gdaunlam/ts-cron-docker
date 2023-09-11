import CompanyEnum from 'apps/src/Enums/Epicor/CompanyEnum';
import { Logger } from '../Config/LoggerConfig';
import { EpicorPriceListPartsService } from '../Services/PriceList/EpicorPriceListPartsService';
import SalesForceAttributes from '../Models/SalesForceAttributes';
import SalesForceAttributesEnum from '../Enums/SalesForce/SalesForceAttributesEnum';
import SalesForcePriceListSellOutHeader from '../Models/PriceList/SalesForcePriceListSellOutHeader';
import SalesForcePriceListService from '../Services/PriceList/SalesForcePriceListService';
import SalesForcePriceListSellOutPBE from '../Models/PriceList/SalesForcePriceListSellOutPBE';

export class PriceListsPull {
  private static companyPriceListMap: { [key in CompanyEnum]: string } = {
    [CompanyEnum.IBN]: '1',
    [CompanyEnum.PQ]: 'CR1',
    [CompanyEnum.COL]: 'CO1',
    [CompanyEnum.PER]: 'PE1',
  };
  public static async pull(): Promise<void> {
    Logger.message.info('Running PriceListPull');
    for (const company of Object.values(CompanyEnum)) {
      const listCode: string = PriceListsPull.companyPriceListMap[company];
      const listCodes: string[] = [listCode];
      try {
        const priceListParts = await this.getPriceListParts(company, listCodes);
        await this.sendPriceListParts(priceListParts);
      } catch (error) {
        Logger.message.error(
          `Error processing price lists for ${company}: ${error.message}`,
        );
      }
    }
  }

  // private static async getPriceListsCodes(company: string): Promise<string[]> {
  //   const response: any =
  //     await EpicorPriceListPartsService.getPriceListsFromEpicor(company);
  //   // Logger.message.info(JSON.stringify(response.data));
  //   const listCodes: string[] = [];
  //   for (const priceList of response.data.value) {
  //     listCodes.push(priceList.ListCode);
  //   }
  //   return listCodes;
  // }
  private static async getPriceListParts(
    company: string,
    listCodes: string[],
  ): Promise<
    [SalesForcePriceListSellOutHeader[], SalesForcePriceListSellOutPBE[]]
  > {
    const response: any =
      await EpicorPriceListPartsService.getPriceListPartsFromEpicor(
        company,
        listCodes,
      );

    const priceListPartsPBE: SalesForcePriceListSellOutPBE[] = [];
    const priceListPartsHeaders: SalesForcePriceListSellOutHeader[] = [];

    for (const priceListPart of response.data.value) {
      priceListPartsHeaders.push(
        SalesForcePriceListSellOutHeader.createFromEpicor(
          priceListPart,
          SalesForceAttributes.create(
            SalesForceAttributesEnum.PRICEBOOK_HEADER,
          ),
        ),
      );
      priceListPartsPBE.push(
        SalesForcePriceListSellOutPBE.createFromEpicor(priceListPart),
      );
    }

    return [priceListPartsHeaders, priceListPartsPBE];
  }
  private static async sendPriceListParts(
    priceListParts: [
      SalesForcePriceListSellOutHeader[],
      SalesForcePriceListSellOutPBE[],
    ],
  ): Promise<void> {
    const [priceListPartsHeaders, priceListPartsPBE] = priceListParts;

    const uniquePriceListPartsHeaders = Array.from(
      new Set(priceListPartsHeaders.map((a) => a.SysRowID__c)),
    ).map((id) => {
      return priceListPartsHeaders.find((a) => a.SysRowID__c === id);
    });

    const chunkSize = Number(process.env.SALESFORCE_APICALLS_MAX_CHUNK_SIZE);

    await this.sendChunks(
      uniquePriceListPartsHeaders,
      chunkSize,
      SalesForcePriceListService.sendPriceBookToSalesForce,
    );
    await this.sendChunks(
      priceListPartsPBE,
      chunkSize,
      SalesForcePriceListService.sendPriceBookEntriesToSalesForce,
    );
  }

  private static async sendChunks<T>(
    array: T[],
    chunkSize: number,
    sendFunction: (chunk: T[]) => Promise<void>,
  ): Promise<void> {
    for (let i = 0; i < array.length; i += chunkSize) {
      const chunk = array.slice(i, i + chunkSize);
      if (chunk.length !== 0) {
        await sendFunction(chunk);
      }
    }
  }
}
