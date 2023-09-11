export default class SalesForceQuote {
  Cantidad_surtida__c: number;
  Cantidad_restante__c: number;
  Status__c: string;

  public constructor(
    Cantidad_surtida__c: number,
    Cantidad_restante__c: number,
    Status__c: string,
  ) {
    this.Cantidad_restante__c = Cantidad_restante__c;
    this.Cantidad_surtida__c = Cantidad_surtida__c;
    this.Status__c = Status__c;
  }

  public static createFromEpicor(data: any) {
    return new SalesForceQuote(
      data.UD16_CantidadRestante_c,
      data.UD16_CantidadSurtida_c,
      data.UD16_Estatus_c,
    );
  }
}
