import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { appEnv } from '../../config/env';
import { DatabaseModule } from '../../infrastructure/database/database.module';
import { LoginController } from './login.controller';
import { LoginRepository } from './login.repository';
import { LoginService } from './login.service';

@Module({
  imports: [
    DatabaseModule,
    JwtModule.register({
      secret: appEnv.jwtSecret,
      signOptions: {
        expiresIn: '12h',
      },
    }),
  ],
  controllers: [LoginController],
  providers: [LoginRepository, LoginService],
  exports: [LoginService],
})
export class LoginModule {}
