import { ApiProperty } from '@nestjs/swagger';
import Customer from '../../Customer/SalesForceCustomer';
export default class PostCustomerResponse {
  @ApiProperty({
    type: Number,
    description: 'statuscode',
  })
  statusCode: number;
  @ApiProperty({
    type: String,
    description: 'message',
  })
  message: string;
  @ApiProperty({
    type: Customer,
    description: 'customers',
    isArray: true,
  })
  customers: Customer[];

  public constructor(
    statusCode: number,
    message: string,
    customers: Customer[],
  ) {
    this.statusCode = statusCode;
    this.message = message;
    this.customers = customers;
  }

  public static create(
    statusCode: number,
    message: string,
    customers: Customer[],
  ): PostCustomerResponse {
    return new PostCustomerResponse(statusCode, message, customers);
  }
}
