import PostContactRequest from './Request/PostContactRequest';

export default class EpicorContact {
  Name: string;
  FirstName: string;
  MiddleName: string;
  LastName: string;
  Company: string;
  CustNum: number;
  EMailAddress: string;
  PhoneNum: string;
  Inactive: boolean;

  public constructor(
    Name: string,
    FirstName: string,
    MiddleName: string,
    LastName: string,
    Company: string,
    CustNum: number,
    EMailAddress: string,
    PhoneNum: string,
    Inactive: boolean,
  ) {
    this.FirstName = FirstName;
    this.MiddleName = MiddleName;
    this.LastName = LastName;
    this.Company = Company;
    this.CustNum = CustNum;
    this.EMailAddress = EMailAddress;
    this.PhoneNum = PhoneNum;
    this.Inactive = Inactive;
    this.Name = Name;
  }

  public static createFromSalesForce(contact: PostContactRequest) {
    return new EpicorContact(
      `${contact.FirstName} ${contact.MiddleName} ${contact.LastName}`,
      contact.FirstName,
      contact.MiddleName,
      contact.LastName,
      contact.Company,
      contact.CustNum,
      contact.Email,
      contact.Phone,
      contact.Activo,
    );
  }
}
