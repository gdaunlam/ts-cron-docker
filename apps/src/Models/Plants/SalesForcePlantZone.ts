import SalesForceAttributes from '../SalesForceAttributes';
export default class SalesForcePlantZone {
  attributes: SalesForceAttributes;
  Compania__c: string;
  Zona_id__c: string;
  Plant__c: string;
  Clave_Compuesta__c: string;

  public constructor(
    attributes: SalesForceAttributes,
    Compania__c: string,
    Zona_id__c: string,
    Plant__c: string,
    Clave_Compuesta__c: string,
  ) {
    this.attributes = attributes;
    this.Compania__c = Compania__c;
    this.Zona_id__c = Zona_id__c;
    this.Plant__c = Plant__c;
    this.Clave_Compuesta__c = Clave_Compuesta__c;
  }

  public static createFromEpicor(
    data: any,
    attributes: SalesForceAttributes,
    zoneId: string,
    //salesForceId: string,
  ) {
    return new SalesForcePlantZone(
      attributes,
      data.Plant_Company,
      zoneId,
      data.Plant_Plant,
      data.Plant_Company + zoneId + data.Plant_Plant,
      //salesForceId,
    );
  }
}
