export default class SalesForcePriceListSellOutPBE {
  PriceLst_SysRowID: string;
  PriceLstParts_SysRowID: string;
  PriceLstParts_BasePrice: string;

  public constructor(
    PriceLst_SysRowID: string,
    PriceLstParts_SysRowID: string,
    PriceLstParts_BasePrice: string,
  ) {
    this.PriceLst_SysRowID = PriceLst_SysRowID;
    this.PriceLstParts_SysRowID = PriceLstParts_SysRowID;
    this.PriceLstParts_BasePrice = PriceLstParts_BasePrice;
  }
  public static createFromEpicor(data: any): SalesForcePriceListSellOutPBE {
    return new SalesForcePriceListSellOutPBE(
      data.PriceLst_Company + data.PriceLst_ListCode,
      data.PriceLst_Company + data.PriceLstParts_PartNum,
      data.PriceLstParts_BasePrice,
    );
  }
}
