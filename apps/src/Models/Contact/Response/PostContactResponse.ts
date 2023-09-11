import { ApiProperty } from '@nestjs/swagger';
import SalesForceContact from '../../Contact/SalesForceContact';
export default class PostContactResponse {
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
    type: SalesForceContact,
    description: 'statuscode',
    isArray: true,
  })
  contacts: SalesForceContact[];

  public constructor(
    statusCode: number,
    message: string,
    contacts: SalesForceContact[],
  ) {
    this.statusCode = statusCode;
    this.message = message;
    this.contacts = contacts;
  }

  public static create(
    statusCode: number,
    message: string,
    contacts: SalesForceContact[],
  ): PostContactResponse {
    return new PostContactResponse(statusCode, message, contacts);
  }
}
