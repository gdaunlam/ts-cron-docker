import SalesForceAttributes from '../SalesForceAttributes';
export default class SalesForceContact {
  attributes: SalesForceAttributes;
  RecordTypeID: string;
  SysRowId__c: string;
  FirstName: string;
  MiddleName: string;
  LastName: string;
  Company__c: string;
  CustNum__c: number;
  ShipToNum__c: string;
  ConNum__c: number;
  Email: string;
  Phone: string;
  //Activo__c: boolean;

  public constructor(
    attributes: SalesForceAttributes,
    RecordTypeID: string,
    SysRowId__c: string,
    FirstName: string,
    MiddleName: string,
    LastName: string,
    Company__c: string,
    CustNum__c: number,
    ShipToNum__c: string,
    ConNum__c: number,
    Email: string,
    Phone: string,
    //Activo__c: boolean,
  ) {
    this.SysRowId__c = SysRowId__c;
    this.FirstName = FirstName;
    this.MiddleName = MiddleName;
    this.LastName = LastName;
    this.Company__c = Company__c;
    this.CustNum__c = CustNum__c;
    this.ShipToNum__c = ShipToNum__c;
    this.ConNum__c = ConNum__c;
    this.Email = Email;
    this.Phone = Phone;
    //this.Activo__c = Activo__c;
    this.attributes = attributes;
    this.RecordTypeID = RecordTypeID;
  }

  public static createFromEpicor(
    data: any,
    attributes: SalesForceAttributes,
    recordType: string,
  ) {
    return new SalesForceContact(
      attributes,
      recordType,
      data.CustCnt_SysRowID,
      data.CustCnt_FirstName,
      data.CustCnt_MiddleName,
      data.CustCnt_LastName === '' || data.CustCnt_LastName === undefined
        ? data.CustCnt_Name
        : data.CustCnt_LastName,
      data.CustCnt_Company,
      Number(data.CustCnt_CustNum),
      data.CustCnt_ShipToNum,
      data.CustCnt_ConNum,
      data.CustCnt_EMailAddress,
      data.CustCnt_PhoneNum,
      //data.Inactive,
    );
  }
}
