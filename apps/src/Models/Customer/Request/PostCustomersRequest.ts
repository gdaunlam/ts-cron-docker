import { ApiProperty } from '@nestjs/swagger';
import { IsArray, IsNotEmpty } from 'class-validator';
import CustomerRequest from './PostCustomerRequest';
import EnumModelMessages from 'apps/src/Enums/EnumModelMessages';
export default class PostCustomersRequest {
  @ApiProperty({
    type: CustomerRequest,
    description: 'customers',
    isArray: true,
  })
  @IsNotEmpty({ message: EnumModelMessages.IS_EMPTY })
  @IsArray()
  customers: CustomerRequest[];
}
