import { Body, Controller, HttpCode, Param, Post } from '@nestjs/common';
import { ApiResponse, ApiTags } from '@nestjs/swagger';
import EnumHttpCodes from '../Enums/EnumHttpCodes';
import PostContactsRequest from '../Models/Contact/Request/PostContactsRequest';
import PostContactResponse from '../Models/Contact/Response/PostContactResponse';
import SalesForceContact from '../Models/Contact/SalesForceContact';
import { ContactService } from '../Services/Contact/ContactService';

@ApiTags('Contact')
@Controller('Contact')
export class ContactController {
  constructor(private readonly contactService: ContactService) {}

  @Post('/:company')
  @ApiResponse({
    status: EnumHttpCodes.CREATED.valueOf(),
    description: 'Success',
    content: {
      'application/json': {},
    },
    type: PostContactResponse,
  })
  @HttpCode(EnumHttpCodes.CREATED)
  async sendCreateContact(
    @Body() contacts: PostContactsRequest,
    @Param('company') company: string,
  ): Promise<any> {
    const updatedContacts: SalesForceContact[] =
      await this.contactService.sendCreateContacts(contacts, company);
    return PostContactResponse.create(201, 'Contacts Created', updatedContacts);
  }
}
