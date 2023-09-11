import { Body, Controller, HttpCode, Post, Get, Param } from '@nestjs/common';
import { ApiResponse, ApiTags } from '@nestjs/swagger';
import EnumHttpCodes from '../Enums/EnumHttpCodes';
import PostQuotesRequest from '../Models/Quote/Request/PostQuotesRequest';
import PostQuoteResponse from '../Models/Quote/Response/PostQuoteResponse';
import { QuoteService } from '../Services/Quote/QuoteService';

@ApiTags('Quote')
@Controller('Quote')
export class QuoteController {
  constructor(private readonly quoteService: QuoteService) {}
  @Post(':company')
  @ApiResponse({
    status: EnumHttpCodes.CREATED.valueOf(),
    description: 'Success',
    content: {
      'application/json': {},
    },
    type: PostQuoteResponse,
  })
  @HttpCode(EnumHttpCodes.CREATED)
  async sendCreateQuote(
    @Body() quotes: PostQuotesRequest,
    @Param('company') company: string,
  ): Promise<any> {
    const updatedQuotes = await this.quoteService.sendCreateQuotes(
      quotes,
      company,
    );
    return PostQuoteResponse.create(201, 'Quotes Created', updatedQuotes);
  }

  @Get('/pull/:company/:empId')
  @ApiResponse({
    status: EnumHttpCodes.OK.valueOf(),
    description: 'Success',
    content: {
      'application/json': {},
    },
    type: PostQuoteResponse,
  })
  @HttpCode(EnumHttpCodes.OK)
  async pullQuote(
    @Param('company') company: string,
    @Param('empId') empId: number,
  ): Promise<any> {
    const response = await this.quoteService.pullQuotes(empId, company);
    return PostQuoteResponse.create(200, 'Quotes pulled', response);
  }
}
