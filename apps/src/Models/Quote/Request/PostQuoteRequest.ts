import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, ValidateNested } from 'class-validator';
import EnumModelMessages from 'apps/src/Enums/EnumModelMessages';
import QuoteRequest from './QuoteRequest';
export default class PostQuoteRequest {
  @ApiProperty({
    type: QuoteRequest,
  })
  @ValidateNested()
  @IsNotEmpty({ message: EnumModelMessages.IS_EMPTY })
  ds: QuoteRequest;
}
