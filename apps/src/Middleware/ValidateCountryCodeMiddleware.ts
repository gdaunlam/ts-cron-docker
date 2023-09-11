import { Response, Request, NextFunction } from 'express';

import { NestMiddleware } from '@nestjs/common';
import { Logger } from '../Config/LoggerConfig';
// import CountryCodesEnum from '../Enums/CountryCodesEnum';

export class ValidateCountryCodeMiddleware implements NestMiddleware {
  use(req: Request, res: Response, next: NextFunction) {

    // if (! req.header('Country-Code')) {
    //   throw new BadRequestException(`Country-Code is required`);
    // }

    // let countries:string[] = Object.keys(CountryCodesEnum)

    // if (!countries.includes(req.header('Country-Code').toString().toUpperCase())) {
    //   throw new BadRequestException(`Invalid Country-Code`);
    // }

    Logger.message.info('Valid Country-Code');
    next();
  }
}