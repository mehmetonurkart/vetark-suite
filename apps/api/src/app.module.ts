import { Module } from '@nestjs/common';
import { HealthModule } from './modules/health/health.module';
import { LoginModule } from './modules/login/login.module';

@Module({
  imports: [HealthModule, LoginModule],
})
export class AppModule {}
