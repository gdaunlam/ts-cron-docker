import SalesforceAttributes from '../SalesForceAttributes';
import SalesForceAttributes from '../SalesForceAttributes';
import CreditHoldEnum from '../../Enums/Customer/CreditHoldEnu';
import NoContactEnum from 'apps/src/Enums/Customer/NoContactEnum';

export default class SalesForceCustomer {
  attributes: SalesforceAttributes;
  RecordTypeID: string;
  Compa_ia__c: string;
  ID_Customer__c: string;
  Nro_Customer__c: number;
  Name: string;
  Calle__c: string;
  N_mero__c: number;
  Colonia__c: string;
  Ciudad__c: string;
  ID_Estado__c: string;
  Zip_C_P__c: string;
  //Pais__c: string;
  ID_Reventa__c: string;
  //SalesRepCode: string; --> no está en salesforce, validar si se pidió
  ID_Zona__c: string;
  //ShipToNum: string; --> esto acá no corresponde
  TermsCode__c: string;
  Forma_de_entrega__c: string;
  CrediHold__c: string;
  ID_Group_Code_Epicor__c: string;
  Description: string;
  Fecha_de_fundaci_n__c: Date;
  Fax: string;
  Phone: string;
  //CurrencyCode: string;
  CountryNum__c: number;
  Nombre_de_facturaci_n__c: string;
  BTCalle__c: string;
  BTN_mero__c: string;
  BT_Colonia__c: string;
  BTCiudad__c: string;
  ID_BT_Estado__c: string;
  BTZip_C_P__c: string;
  BTNro_Pa_s__c: number;
  BTPa_s__c: string;
  BTNro_Tel_fono__c: string;
  BTNro_Fax__c: string;
  Correo_electronico__c: string;
  Tipo_de_Cliente__c: string;
  NoContact__c: string;
  BillFrequency__c: string;
  PMUID__c: string;
  Subzona__c: string;
  CorreosCopia__c: string;
  Nombre_largo_fiscal__c: string;
  ID_Region_Epicor__c: string;
  Tipo_Customer__c: string;
  SysRowId__c: string;
  Type: string;

  public constructor(
    attributes: SalesforceAttributes,
    RecordTypeID: string,
    Compa_ia__c: string,
    ID_Customer__c: string,
    Nro_Customer__c: number,
    Name: string,
    Calle__c: string,
    N_mero__c: number,
    Colonia__c: string,
    Ciudad__c: string,
    ID_Estado__c: string,
    Zip_C_P__c: string,
    //Pais__c: string,
    ID_Reventa__c: string,
    //SalesRepCode: string, --> no está en salesforce, validar si se pidió
    ID_Zona__c: string,
    //ShipTpNum: string, --> esto acá no corresponde
    TermsCode__c: string,
    Forma_de_entrega__c: string,
    CrediHold__c: string,
    ID_Group_Code_Epicor__c: string,
    Description: string,
    Fecha_de_fundaci_n__c: Date,
    Fax: string,
    Phone: string,
    //CurrencyCode: string,
    CountryNum__c: number,
    Nombre_de_facturaci_n__c: string,
    BTCalle__c: string,
    BTN_mero__c: string,
    BT_Colonia__c: string,
    BTCiudad__c: string,
    ID_BT_Estado__c: string,
    BTZip_C_P__c: string,
    BTNro_Pa_s__c: number, // validar tipo de dato
    BTPa_s__c: string,
    BTNro_Tel_fono__c: string,
    BTNro_Fax__c: string,
    Correo_electronico__c: string,
    Tipo_de_Cliente__c: string,
    NoContact__c: string,
    BillFrequency__c: string,
    PMUID__c: string,
    Subzona__c: string,
    CorreosCopia__c: string,
    Nombre_largo_fiscal__c: string,
    ID_Region_Epicor__c: string,
    Tipo_Customer__c: string,
    SysRowId__c: string,
    Type: string,
  ) {
    this.RecordTypeID = RecordTypeID;
    this.Name = Name;
    this.attributes = attributes;
    this.Nombre_largo_fiscal__c = Nombre_largo_fiscal__c;
    this.Compa_ia__c = Compa_ia__c;
    this.ID_Customer__c = ID_Customer__c;
    this.Type = Type;
    this.Nro_Customer__c = Nro_Customer__c;
    this.Ciudad__c = Ciudad__c;
    this.Zip_C_P__c = Zip_C_P__c;
    this.ID_Reventa__c = ID_Reventa__c;
    this.Description = Description;
    this.Fecha_de_fundaci_n__c = Fecha_de_fundaci_n__c;
    this.Fax = Fax;
    this.Phone = Phone;
    this.CountryNum__c = CountryNum__c;
    this.BTCiudad__c = BTCiudad__c;
    this.BT_Colonia__c = BT_Colonia__c;
    this.BTCalle__c = BTCalle__c;
    this.BTZip_C_P__c = BTZip_C_P__c;
    this.BTNro_Pa_s__c = BTNro_Pa_s__c;
    this.BTNro_Tel_fono__c = BTNro_Tel_fono__c;
    this.BTNro_Fax__c = BTNro_Fax__c;
    this.BillFrequency__c = BillFrequency__c;
    this.Subzona__c = Subzona__c;
    this.CorreosCopia__c = CorreosCopia__c;
    this.BTPa_s__c = BTPa_s__c;
    this.Forma_de_entrega__c = Forma_de_entrega__c;
    this.CrediHold__c = CrediHold__c;
    this.Nombre_de_facturaci_n__c = Nombre_de_facturaci_n__c;
    this.Fax = Fax;
    this.Tipo_Customer__c = Tipo_Customer__c;
    this.SysRowId__c = SysRowId__c;
    this.Calle__c = Calle__c;
    this.N_mero__c = N_mero__c;
    this.Colonia__c = Colonia__c;
    this.ID_Zona__c = ID_Zona__c;
    this.ID_Estado__c = ID_Estado__c;
    this.TermsCode__c = TermsCode__c;
    this.ID_Group_Code_Epicor__c = ID_Group_Code_Epicor__c;
    this.BTN_mero__c = BTN_mero__c;
    this.ID_BT_Estado__c = ID_BT_Estado__c;
    this.Correo_electronico__c = Correo_electronico__c;
    this.Tipo_de_Cliente__c = Tipo_de_Cliente__c;
    this.NoContact__c = NoContact__c;
    this.PMUID__c = PMUID__c;
    this.ID_Region_Epicor__c = ID_Region_Epicor__c;
  }

  public static createFromEpicor(
    data: any,
    attributes: SalesForceAttributes,
    recordType: string,
  ) {
    return new SalesForceCustomer(
      attributes,
      recordType,
      data.Customer_Company,
      data.Customer_CustID,
      data.Customer_CustNum,
      data.Customer_Name,
      data.Customer_Address1,
      Number(data.Customer_Address2), // --> ver de cambiarlo a string
      data.Customer_Address3,
      data.Customer_City,
      data.Customer_State,
      data.Customer_Zip,
      //data.Customer_Country,
      data.Customer_ResaleID,
      //data.Customer_SalesRepCode,
      data.Customer_TerritoryID,
      //data.Customer_ShipToNum,
      data.Customer_TermsCode,
      data.Customer_ShipViaCode,
      data.Customer_CreditHold === false
        ? CreditHoldEnum.NO
        : CreditHoldEnum.SI,
      data.Customer_GroupCode,
      data.Customer_Comment,
      data.Customer_EstDate,
      data.Customer_FaxNum,
      data.Customer_PhoneNum,
      //data.Customer_CurrencyCode,
      data.Customer_CountryNum,
      data.Customer_BTName,
      data.Customer_BTAddress1,
      data.Customer_BTAddress2,
      data.Customer_BTAddress3,
      data.Customer_BTCity,
      data.Customer_BTState,
      data.Customer_BTZip,
      data.Customer_BTCountryNum,
      data.Customer_BTCountry,
      data.Customer_BTPhoneNum,
      data.Customer_BTFaxNum,
      data.Customer_EMailAddress,
      data.Customer_CustomerType,
      data.Customer_NoContact === false ? NoContactEnum.NO : NoContactEnum.SI,
      data.Customer_BillFrequency,
      data.Customer_PMUID,
      data.Customer_Subzona_c,
      data.Customer_CorreosCopia_c,
      data.Customer_Character01,
      data.Customer_Character02,
      data.Customer_TipoCustomer_c,
      data.Customer_SysRowID,
      'Distribuidor', //Type
    );
  }
}
