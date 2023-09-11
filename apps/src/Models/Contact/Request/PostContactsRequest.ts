import { ApiProperty } from '@nestjs/swagger';
import { IsArray, IsNotEmpty } from 'class-validator';
import EnumModelMessages from 'apps/src/Enums/EnumModelMessages';
import PostContactRequest from './PostContactRequest';
export default class PostContactsRequest {
  @ApiProperty({
    type: PostContactRequest,
    description: 'contacts',
    isArray: true,
  })
  @IsNotEmpty({ message: EnumModelMessages.IS_EMPTY })
  @IsArray()
  contacts: PostContactRequest[];
}
