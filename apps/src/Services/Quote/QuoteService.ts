import { HttpException, Injectable, Scope } from '@nestjs/common';
import { Logger } from 'apps/src/Config/LoggerConfig';
import CompanyEnum from 'apps/src/Enums/Epicor/CompanyEnum';
import PostQuotesRequest from 'apps/src/Models/Quote/Request/PostQuotesRequest';
import SalesForceQuote from 'apps/src/Models/Quote/SalesForceQuote';
import { EpicorQuoteService } from './EpicorQuoteService';
import { SalesForceQuoteService } from './SalesForceQuoteService';
@Injectable({ scope: Scope.REQUEST })
export class QuoteService {
  public constructor(private readonly epicorApiService: EpicorQuoteService) {}

  async sendCreateQuotes(
    allQuotes: PostQuotesRequest,
    company: string,
  ): Promise<any> {
    const updatedQuotes = [];
    for (const quote of allQuotes.quotes) {
      quote.ds.UD16.forEach((elem) => {
        elem.GlobalUD16 = false;
        elem.GlobalLock = false;
        elem.SysRevID = 0;
        elem.BitFlag = 0;
        elem.RowMod = 'A';
        elem.UD_SysRevID = '';
        elem.Plataforma_c = 4;
      });
      const response = await this.epicorApiService.createQuote(quote, company);
      Logger.message.info(`Epicor response: ${JSON.stringify(response.data)}`);
      Logger.message.info(`Epicor status: ${JSON.stringify(response.status)}`);
      updatedQuotes.push(response.data);
    }
    return updatedQuotes;
  }

  async pullQuotes(empId: number, company: string): Promise<any> {
    if (!Object.values(CompanyEnum).includes(company as CompanyEnum)) {
      throw new HttpException('Invalid company', 400);
    }
    return await this.getAndSendQuotes(company, empId);
  }

  private async getAndSendQuotes(
    company: string,
    empId: number,
  ): Promise<any[]> {
    const response: any = await this.epicorApiService.getQuotesFromEpicor(
      company,
      empId,
    );
    const quotes: SalesForceQuote[] = [];

    for (const quote of response.data.value) {
      quotes.push(SalesForceQuote.createFromEpicor(quote));
    }
    const responses: any[] = [];
    if (quotes.length === 0)
      throw new HttpException(`Quotes not found with empId:${empId}`, 404);
    for (const quote of quotes) {
      const response = await SalesForceQuoteService.sendContactsToSalesForce(
        quote,
      );
      responses.push(response.data);
    }
    return responses;
  }
}
