import { ApiProperty } from '@nestjs/swagger';
export default class PostQuoteResponse {
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
    description: 'quotes',
    isArray: true,
  })
  quotes: any;

  public constructor(statusCode: number, message: string, quotes: any) {
    this.statusCode = statusCode;
    this.message = message;
    this.quotes = quotes;
  }

  public static create(
    statusCode: number,
    message: string,
    quotes: any,
  ): PostQuoteResponse {
    return new PostQuoteResponse(statusCode, message, quotes);
  }
}
