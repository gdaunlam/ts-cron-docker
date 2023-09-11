import { Logger } from '../Config/LoggerConfig';
import CompanyEnum from '../Enums/Epicor/CompanyEnum';
import SalesForceAttributesEnum from '../Enums/SalesForce/SalesForceAttributesEnum';
import SalesForceAttributes from '../Models/SalesForceAttributes';
import SalesForceShipToe from '../Models/ShipToe/SalesForceShipToe';
import { EpicorShipToeService } from '../Services/ShipToe/EpicorShipToeService';
import { SalesForceShipToeService } from '../Services/ShipToe/SalesForceShipToeService';

export class ShipToesPull {
  public static async pull(): Promise<void> {
    Logger.message.info('Running ShipToesPull');
    const companyValues: string[] = Object.values(CompanyEnum);

    for (const company of companyValues) {
      await this.getAndSendShipToes(company);
    }
  }

  private static async getAndSendShipToes(company: string): Promise<void> {
    const response: any =
      await EpicorShipToeService.getShipToesFromEpicorByChangeDate(company);
    if (response) {
      Logger.message.info('Epicor Response');
      Logger.message.info(JSON.stringify(response.data));
      Logger.message.info('Epicor Response Status');
      Logger.message.info(JSON.stringify(response.status));
      Logger.message.info('Epicor Response Status message');
      Logger.message.info(JSON.stringify(response.statusText));
    }
    const shipToes: SalesForceShipToe[] = [];
    const chunkSize = Number(process.env.SALESFORCE_APICALLS_MAX_CHUNK_SIZE);

    for (const shipToe of response.data.value) {
      shipToes.push(
        SalesForceShipToe.createFromEpicor(
          shipToe,
          SalesForceAttributes.create(SalesForceAttributesEnum.SHIPTOE),
        ),
      );
    }
    if (shipToes.length === 0) return;
    for (let i = 0; i < shipToes.length; i += chunkSize) {
      const shipToesChunk = shipToes.slice(i, i + chunkSize);
      if (shipToesChunk.length !== 0) {
        const sfResponse =
          await SalesForceShipToeService.sendShipToeToSalesForce(shipToesChunk);
        if (sfResponse) {
          Logger.message.info('SalesForceResponse');
          Logger.message.info(JSON.stringify(sfResponse.data));
          Logger.message.info('SalesForceResponse Status');
          Logger.message.info(JSON.stringify(sfResponse.status));
          Logger.message.info('Salesforce Response Status message');
          Logger.message.info(JSON.stringify(sfResponse.statusText));
        }
      }
    }
    return;
  }
}
