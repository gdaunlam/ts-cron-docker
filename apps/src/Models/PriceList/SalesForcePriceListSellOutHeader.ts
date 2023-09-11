import SalesForceAttributes from '../SalesForceAttributes';
export default class SalesForcePriceListSellOutHeader {
  attributes: SalesForceAttributes;
  Compania__c: string;
  Name: string;
  LP_Sell_out__c: boolean;
  IsActive: boolean;
  SysRowID__c: string;

  public constructor(
    attributes: SalesForceAttributes,
    Compania__c: string,
    Name: string,
    LP_Sell_out__c: boolean,
    IsActive: boolean,
    SysRowID__c: string,
  ) {
    this.attributes = attributes;
    this.Compania__c = Compania__c;
    this.LP_Sell_out__c = LP_Sell_out__c;
    this.IsActive = IsActive;
    this.Name = Name;
    this.SysRowID__c = SysRowID__c;
  }
  public static createFromEpicor(
    data: any,
    attributes: SalesForceAttributes,
  ): SalesForcePriceListSellOutHeader {
    return new SalesForcePriceListSellOutHeader(
      attributes,
      data.PriceLst_Company,
      data.PriceLst_Company, // Name
      true, // Asegúrate de mapear LP_Sell_out__c correctamente
      true, // Deberías verificar si existe un campo correspondiente en tus datos
      data.PriceLst_Company + data.PriceLst_ListCode,
    );
  }
}
