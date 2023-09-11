import SalesForceAttributes from '../SalesForceAttributes';

export default class SalesForceProduct {
  attributes: SalesForceAttributes;
  Compania__c: string;
  ProductCode: string;
  Name: string;
  Description: string;
  IUM__c: string;
  PUM__c: string;
  ShortChar01__c: string;
  Portafolio__c: string;
  IsActive: boolean;
  SysRowID__c: string;

  public constructor(
    attributes: SalesForceAttributes,
    Compania__c: string,
    ProductCode: string,
    Name: string,
    Description: string,
    IUM__c: string,
    PUM__c: string,
    ShortChar01__c: string,
    Portafolio__c: string,
    IsActive: boolean,
    SysRowID__c: string,
  ) {
    this.attributes = attributes;
    this.Compania__c = Compania__c;
    this.ProductCode = ProductCode;
    this.Name = Name;
    this.Description = Description;
    this.IUM__c = IUM__c;
    this.PUM__c = PUM__c;
    this.ShortChar01__c = ShortChar01__c;
    this.Portafolio__c = Portafolio__c;
    this.IsActive = IsActive;
    this.SysRowID__c = SysRowID__c;
  }

  public static createFromEpicor(
    data: any,
    attributes: SalesForceAttributes,
  ): SalesForceProduct {
    return new SalesForceProduct(
      attributes,
      data.Part_Company,
      data.PriceLstParts_PartNum,
      data.Part_PartDescription, //Nombre
      data.Part_PartDescription, //Descripción
      data.Part_IUM,
      data.Part_PUM,
      data.Part_ShortChar01,
      data.Part_Portafolio_c,
      true,
      data.Part_Company + data.PriceLstParts_PartNum,
    );
  }
}
