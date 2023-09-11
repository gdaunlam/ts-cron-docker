export default class EpicorFiltersEnum {
  public static BASE_FILTER_SYNTAX = '?%24filter=';
  public static AND_CONCAT = '%20and%20';
  private static CHANGEDATE_GREATER_THAN = 'ChangeDate%20gt%20';
  private static GREATER_THAN = '%20gt%20';
  private static EQ = '%20eq%20';

  public static setGTFilter(field: string, value: any) {
    return field + this.GREATER_THAN + value;
  }

  public static setEQFilter(field: string, value: any) {
    return field + this.EQ + value;
  }

  public static setChangeDateGTFilter(date: string): string {
    const modifiedDate: string = date.replace(':', '%3A');
    return (
      this.BASE_FILTER_SYNTAX + this.CHANGEDATE_GREATER_THAN + modifiedDate
    );
  }
}
