export default class TipoCustomerEnum {
  public static AGRICULTURAL = 'UF';
  public static DISTRIBUTOR = 'DS';
  public static SUBDISTRIBUTOR = 'SD';

  public static isDistributor(value: string): boolean {
    if (
      value === TipoCustomerEnum.DISTRIBUTOR ||
      value === TipoCustomerEnum.SUBDISTRIBUTOR
    ) {
      return true;
    }
    return false;
  }

  public static isAgriCultural(value: string): boolean {
    if (value === TipoCustomerEnum.AGRICULTURAL) {
      return true;
    }
    return false;
  }
}
