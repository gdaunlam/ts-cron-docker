import SalesForceAttributes from '../SalesForceAttributes';
export default class SalesForceShipToe {
  attributes: SalesForceAttributes;
  ID_Direccion__c: string;
  Company__c: string;
  CustNum__c: number;
  ShipToNum__c: string;
  Name: string;
  Tel_fono__c: string;
  Correo_electronico__c: string;
  Formato_de_entrega__c: string;
  Calle__c: string;
  N_mero__c: string;
  Colonia__c: string;
  Ciudad__c: string;
  Codigo_Postal__c: string;
  Pa_s__c: number;
  ID_Zona__c: string;
  Zona__c: string;
  SysRowId__c: string;

  public constructor(
    attributes: SalesForceAttributes,
    ID_Direccion__c: string,
    Company__c: string,
    CustNum__c: number,
    ShipToNum__c: string,
    Name: string,
    Tel_fono__c: string,
    Correo_electronico__c: string,
    Formato_de_entrega__c: string,
    Calle__c: string,
    N_mero__c: string,
    Colonia__c: string,
    Ciudad__c: string,
    Codigo_Postal__c: string,
    Pa_s__c: number,
    ID_Zona__c: string,
    SysRowId__c: string,
  ) {
    this.attributes = attributes;
    this.ID_Direccion__c = ID_Direccion__c;
    this.Name = Name;
    this.Tel_fono__c = Tel_fono__c;
    this.Correo_electronico__c = Correo_electronico__c;
    this.Formato_de_entrega__c = Formato_de_entrega__c;
    this.Calle__c = Calle__c;
    this.N_mero__c = N_mero__c;
    this.Colonia__c = Colonia__c;
    this.Codigo_Postal__c = Codigo_Postal__c;
    this.Pa_s__c = Pa_s__c;
    this.ID_Zona__c = ID_Zona__c;
    this.Company__c = Company__c;
    this.CustNum__c = CustNum__c;
    this.ShipToNum__c = ShipToNum__c;
    this.Ciudad__c = Ciudad__c;
    this.SysRowId__c = SysRowId__c;
  }

  public static createFromEpicor(
    data: any,
    attributes: SalesForceAttributes,
  ): SalesForceShipToe {
    return new SalesForceShipToe(
      attributes,
      data.ShipTo_Company + Number(data.ShipTo_CustNum) + data.ShipTo_ShipToNum,
      data.ShipTo_Company,
      Number(data.ShipTo_CustNum),
      data.ShipTo_ShipToNum,
      data.ShipTo_Name,
      data.ShipTo_PhoneNum,
      data.ShipTo_EMailAddress,
      data.ShipTo_ShipViaCode,
      data.ShipTo_Address1,
      data.ShipTo_Address2,
      data.ShipTo_Address3,
      data.ShipTo_City,
      data.ShipTo_ZIP,
      Number(data.ShipTo_CountryNum),
      data.ShipTo_TerritoryID,
      data.ShipTo_SysRowID,
    );
  }
}
