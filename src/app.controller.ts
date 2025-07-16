/**
 * Provides a public root route to check if the API is live.
 * Returns a simple JSON response with status and timestamp.
 */
import { Controller, Get } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse } from '@nestjs/swagger';
import { Public } from './common/decorators/public.decorator';

@ApiTags('App')
@Controller()
export class AppController {
  @Public()
  @Get()
  @ApiOperation({ summary: 'Check if BikeAPI is live' })
  @ApiResponse({
    status: 200,
    description: 'API is live and responding',
    schema: {
      example: {
        message: ' BikeAPI is live!',
        status: 'OK',
        timestamp: '2025-07-04T15:11:00.000Z',
      },
    },
  })
  getHello() {
    return {
      message: ' BikeAPI is live!',
      status: 'OK',
      timestamp: new Date().toISOString(),
    };
  }
}
