export default class SalesForceRecordType {
  Name: string;

  public constructor(name: string) {
    this.Name = name;
  }

  public static create(name: string) {
    return new SalesForceRecordType(name);
  }
}
