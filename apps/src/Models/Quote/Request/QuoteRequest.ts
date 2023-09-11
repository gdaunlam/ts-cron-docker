import { ApiProperty } from '@nestjs/swagger';
import { IsArray, IsNotEmpty, ValidateNested } from 'class-validator';
import EnumModelMessages from 'apps/src/Enums/EnumModelMessages';
import UD16Request from './UD16Request';
export default class QuoteRequest {
  @ApiProperty({
    type: UD16Request,
    isArray: true,
  })
  @ValidateNested()
  @IsNotEmpty({ message: EnumModelMessages.IS_EMPTY })
  @IsArray()
  UD16: UD16Request[];
}
