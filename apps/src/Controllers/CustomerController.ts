import { Body, Controller, HttpCode, Param, Post } from '@nestjs/common';
import { ApiResponse, ApiTags } from '@nestjs/swagger';
import EnumHttpCodes from '../Enums/EnumHttpCodes';
import PostCustomersRequest from '../Models/Customer/Request/PostCustomersRequest';
import PostCustomerResponse from '../Models/Customer/Response/PostCustomerResponse';
import SalesForceCustomer from '../Models/Customer/SalesForceCustomer';
import { CustomerService } from '../Services/Customer/CustomerService';

@ApiTags('Customer')
@Controller('Customer')
export class CustomerController {
  constructor(private readonly customerService: CustomerService) {}

  @Post('/:company')
  @ApiResponse({
    status: EnumHttpCodes.CREATED.valueOf(),
    description: 'Success',
    content: {
      'application/json': {},
    },
    type: PostCustomerResponse,
  })
  @HttpCode(EnumHttpCodes.CREATED)
  async sendCreateCustomer(
    @Body() customers: PostCustomersRequest,
    @Param('company') company: string,
  ): Promise<any> {
    const updatedCustomers: SalesForceCustomer[] =
      await this.customerService.sendCreateCustomers(customers, company);
    return PostCustomerResponse.create(
      201,
      'Customers Created',
      updatedCustomers,
    );
  }
}
