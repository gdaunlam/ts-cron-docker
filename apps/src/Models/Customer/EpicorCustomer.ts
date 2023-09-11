import SalesForceCustomerCompanyEnum from '../../Enums/SalesForce/SalesForceCustomerCompanyEnum';
import CreditHoldEnum from 'apps/src/Enums/Customer/CreditHoldEnu';
import PostCustomerRequest from './Request/PostCustomerRequest';

export default class EpicorCustomer {
  Company: string;
  CustID: string;
  CustNum: number;
  Name: string;
  Address1: string;
  Address2: string;
  Address3: string;
  City: string;
  State: string;
  Zip: string;
  ResaleID: string;
  Country: string;
  TerritoryID: string;
  TermsCode: string;
  ShipViaCode: string;
  GroupCode: string;
  PhoneNum: string;
  CurrencyCode: string;
  CountryNum: number;
  EMailAddress: string;
  TipoCustomer_c: string;
  NoContact: boolean;
  TerritoryLock: boolean;
  FederalID: string;
  SysRevID: number;
  SysRowID: string;
  RowMod: string;
  Subzona_c: string;
  BTName: string;
  Character01: string;
  Comment: string;
  EstDate: Date;
  BTCity: string;
  BTAddress1: string;
  BTZip: string;
  BTCountryNum: number;
  BTCountry: string;
  BTPhoneNum: string;
  BTFaxNum: string;
  BillFrequency: string;
  CorreosCopia_c: string;
  CreditHold: boolean;
  FaxNum: string;

  public constructor(
    Company: string,
    CustID: string,
    Name: string,
    Address1: string,
    Address2: string,
    Address3: string,
    City: string,
    State: string,
    Zip: string,
    Country: string,
    TerritoryID: string,
    Subzona_c: string,
    TipoCustomer_c: string,
    Character01: string,
    CustNum: number,
    ResaleID: string,
    Comment: string,
    EstDate: Date,
    CountryNum: number,
    BTCity: string,
    BTAddress1: string,
    BTZip: string,
    BTCountryNum: number,
    BTCountry: string,
    BTPhoneNum: string,
    BTFaxNum: string,
    BillFrequency: string,
    CorreosCopia_c: string,
    ShipViaCode: string,
    CreditHold: boolean,
    BTName: string,
    FaxNum: string,
    PhoneNum: string,
  ) {
    this.Company = Company;
    this.CustID = CustID;
    this.Name = Name;
    this.City = City;
    this.Zip = Zip;
    this.TerritoryID = TerritoryID;
    this.Address1 = Address1;
    this.Address2 = Address2;
    this.Address3 = Address3;
    this.State = State;
    this.Country = Country;
    this.Subzona_c = Subzona_c;
    this.TipoCustomer_c = TipoCustomer_c;
    this.Character01 = Character01;
    this.CustNum = CustNum;
    this.ResaleID = ResaleID;
    this.Comment = Comment;
    this.EstDate = EstDate;
    this.CountryNum = CountryNum;
    this.BTCity = BTCity;
    this.BTAddress1 = BTAddress1;
    this.BTZip = BTZip;
    this.BTCountryNum = BTCountryNum;
    this.BTCountry = BTCountry;
    this.BTPhoneNum = BTPhoneNum;
    this.BTFaxNum = BTFaxNum;
    this.BillFrequency = BillFrequency;
    this.CorreosCopia_c = CorreosCopia_c;
    this.ShipViaCode = ShipViaCode;
    this.CreditHold = CreditHold;
    this.BTName = BTName;
    this.FaxNum = FaxNum;
    this.PhoneNum = PhoneNum;
  }

  public static createFromSalesForce(
    customer: PostCustomerRequest,
  ): EpicorCustomer {
    return new EpicorCustomer(
      SalesForceCustomerCompanyEnum.AGRICULTURAL,
      customer.ID_Customer,
      customer.Name,
      customer.Calle,
      String(customer.N_mero),
      customer.Colonia,
      customer.Ciudad,
      'State',
      customer.Zip_C_P,
      customer.BTPa_s,
      customer.ID_Zona,
      customer.Subzona,
      customer.Tipo_Customer,
      customer.Nombre_largo_fiscal,
      customer.Nro_Customer,
      customer.ID_Reventa,
      customer.Description,
      customer.Fecha_de_fundaci_n,
      Number(customer.Nro_Pais),
      customer.BTCiudad,
      customer.BTCalle,
      customer.BTZip_C_P,
      customer.BTNro_Pa_s,
      customer.BTPa_s,
      customer.BTNro_Tel_fono,
      customer.BTNro_Fax,
      customer.BillFrequency,
      customer.CorreosCopia,
      customer.Forma_de_entrega,
      customer.CrediHold === CreditHoldEnum.SI ? true : false,
      customer.Nombre_de_facturaci_n,
      customer.fax,
      customer.Phone,
    );
  }
}
