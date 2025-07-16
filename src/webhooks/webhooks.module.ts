import { Module } from '@nestjs/common';
import { WebhooksController } from './webhooks.controller';
import { WebhooksService } from './webhooks.service';
import { MongooseModule } from '@nestjs/mongoose';
import { Log, LogSchema } from '../logs/schemas/log.schema';

@Module({
  imports: [MongooseModule.forFeature([{ name: Log.name, schema: LogSchema }])],
  controllers: [WebhooksController],
  providers: [WebhooksService],
  exports: [MongooseModule],
})
// Module class for webhooks
export class WebhooksModule {}
