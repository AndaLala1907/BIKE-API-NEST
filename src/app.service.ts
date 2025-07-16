import { Injectable } from '@nestjs/common';
// Simple service returning a welcome message
@Injectable()
// Returns fixed welcome text
export class AppService {
  getHello(): string {
    return 'BikeAPI is live!';
  }
}
