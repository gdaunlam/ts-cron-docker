import SalesForceAttributes from '../SalesForceAttributes';
export default class SalesForcePlant {
  attributes: SalesForceAttributes;
  Compa_ia__c: string;
  Name: string;
  Plant__c: string;
  SysRowID__c: string;

  public constructor(
    attributes: SalesForceAttributes,
    Compa_ia: string,
    Name: string,
    Plant: string,
    SysRowID: string,
  ) {
    this.attributes = attributes;
    this.Compa_ia__c = Compa_ia;
    this.Name = Name;
    this.Plant__c = Plant;
    this.SysRowID__c = SysRowID;
  }

  public static createFromEpicor(data: any, attributes: SalesForceAttributes) {
    return new SalesForcePlant(
      attributes,
      data.Plant_Company,
      data.Plant_Name,
      data.Plant_Plant,
      data.Plant_Company + data.Plant_Plant, // no tenemos sysrowid, creamos la clave compuesta sobre ese campo
    );
  }
}
