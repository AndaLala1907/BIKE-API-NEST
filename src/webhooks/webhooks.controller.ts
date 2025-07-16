/**
 * Receives real-time requests from devices to manage journey lifecycle:
 * - Start: begins a journey and initializes a log
 * - Ping: updates log coordinates during journey
 * - Stop: ends journey and calculates final stats
 */
import { Controller, Post, Body } from '@nestjs/common';
import { WebhooksService } from './webhooks.service';
import { StartDto } from './dto/start.dto';
import { PingDto } from './dto/ping.dto';
import { StopDto } from './dto/stop.dto';
import { ApiTags, ApiOperation, ApiBearerAuth } from '@nestjs/swagger';
import { Public } from 'src/common/decorators/public.decorator';

@ApiTags('Webhooks') // Groups under "Webhooks" in Swagger UI
@ApiBearerAuth('jwt-auth')
@Controller('webhooks')
export class WebhooksController {
  constructor(private readonly service: WebhooksService) {}

  /**
   * Starts a journey and creates the initial log
   */
  @Post('start')
  @Public()
  @ApiOperation({ summary: 'Start journey and create a log' })
  start(@Body() dto: StartDto) {
    return this.service.start(dto);
  }

  /**
   * Sends coordinates during journey to update log
   */
  @Post('ping')
  @Public()
  @ApiOperation({ summary: 'Ping log with new coordinates' })
  ping(@Body() dto: PingDto) {
    return this.service.ping(dto);
  }

  /**
   * Finalizes journey and calculates stats in the log
   */
  @Post('stop')
  @Public()
  @ApiOperation({ summary: 'Stop journey and close the log' })
  stop(@Body() dto: StopDto) {
    return this.service.stop(dto);
  }
}
