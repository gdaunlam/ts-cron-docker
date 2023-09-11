import { ApiProperty } from '@nestjs/swagger';
import { IsArray, IsNotEmpty, ValidateNested } from 'class-validator';
import EnumModelMessages from 'apps/src/Enums/EnumModelMessages';
import PostQuoteRequest from './PostQuoteRequest';
export default class PostQuotesRequest {
  @ApiProperty({
    type: PostQuoteRequest,
    isArray: true,
  })
  @ValidateNested()
  @IsNotEmpty({ message: EnumModelMessages.IS_EMPTY })
  @IsArray()
  quotes: PostQuoteRequest[];
}
