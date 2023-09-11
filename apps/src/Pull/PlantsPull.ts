import { Logger } from '../Config/LoggerConfig';
import CompanyEnum from '../Enums/Epicor/CompanyEnum';
import SalesForceAttributesEnum from '../Enums/SalesForce/SalesForceAttributesEnum';
import SalesForcePlant from '../Models/Plants/SalesForcePlant';
import SalesForcePlantZone from '../Models/Plants/SalesForcePlantZone';
import SalesForceAttributes from '../Models/SalesForceAttributes';
import { EpicorPlantService } from '../Services/Plants/EpicorPlantService';
import { SalesForcePlantService } from '../Services/Plants/SalesForcePlantService';

export class PlantsPull {
  public static async pull(): Promise<void> {
    Logger.message.info('Running PlantsPull');
    const companyValues: string[] = Object.values(CompanyEnum);

    for (const company of companyValues) {
      await this.getAndSendPlants(company);
    }
  }

  private static async getAndSendPlants(company: string): Promise<void> {
    const response: any = await EpicorPlantService.getPlantsFromEpicor(company);
    if (response) {
      Logger.message.info('Epicor Response');
      Logger.message.info(JSON.stringify(response.data));
      Logger.message.info('Epicor Response Status');
      Logger.message.info(JSON.stringify(response.status));
      Logger.message.info('Epicor Response Status message');
      Logger.message.info(JSON.stringify(response.statusText));
    }

    for (const plant of response.data.value) {
      const salesForceResponse =
        await SalesForcePlantService.sendPlantsToSalesForce(
          SalesForcePlant.createFromEpicor(
            plant,
            SalesForceAttributes.create(SalesForceAttributesEnum.PLANT),
          ),
        );
      if (salesForceResponse) {
        Logger.message.info('SF Response');
        Logger.message.info(JSON.stringify(salesForceResponse.data));
        Logger.message.info('SF Response Status');
        Logger.message.info(JSON.stringify(salesForceResponse.status));
        Logger.message.info('SF Response Status message');
        Logger.message.info(JSON.stringify(salesForceResponse.statusText));
      }
      const Character01: string = plant.Plant_Character01;
      const plantsZones = Character01.split('~');
      //const salesForceId = salesForceResponse.data[0].id; //ID DE SALESFORCE DE LA BODEGA
      if (plantsZones.length === 0) {
        Logger.message.error(
          `No se encontraron zonas asignadas para la bodega: ${plant.Plant_Plant}`,
        );
      } else {
        for (const zone of plantsZones) {
          const response = await SalesForcePlantService.sendZonesToSalesForce(
            SalesForcePlantZone.createFromEpicor(
              plant,
              SalesForceAttributes.create(SalesForceAttributesEnum.PLANT_ZONE),
              String(zone),
              //salesForceId,
            ),
          );
          if (response) {
            Logger.message.info('SF Response');
            Logger.message.info(JSON.stringify(response.data));
            Logger.message.info('SF Response Status');
            Logger.message.info(JSON.stringify(response.status));
            Logger.message.info('SF Response Status message');
            Logger.message.info(JSON.stringify(response.statusText));
          }
        }
      }
    }
  }
}
