import { Controller, Get, HttpCode } from '@nestjs/common';
import { ApiResponse, ApiTags } from '@nestjs/swagger';
import EnumHttpCodes from '../Enums/EnumHttpCodes';

@ApiTags('health-check')
@Controller('health-check')
export class HealthCheckController {
  @Get('')
  @ApiResponse({
    status: EnumHttpCodes.OK.valueOf(),
    description: 'Success',
    content: {
      'application/json': {},
    },
    type: Object,
  })
  @HttpCode(EnumHttpCodes.OK)
  async get(): Promise<any> {
    return { message: 'Middleware OK' };
  }
}
