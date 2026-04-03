import { Injectable } from '@nestjs/common';

@Injectable()
export class HealthService {
  getStatus() {
    return {
      service: 'api',
      status: 'ok',
    };
  }
}
