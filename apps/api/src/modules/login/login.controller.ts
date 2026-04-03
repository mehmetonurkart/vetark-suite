import { Body, Controller, Get, Post, Req, Res } from '@nestjs/common';
import type { Request, Response } from 'express';
import { LoginRequestDto } from './dto/login-request.dto';
import { SESSION_COOKIE_NAME, SESSION_COOKIE_OPTIONS } from './login.constants';
import { LoginService } from './login.service';

@Controller('login')
export class LoginController {
  constructor(private readonly loginService: LoginService) {}

  @Post()
  async login(
    @Body() body: LoginRequestDto,
    @Res({ passthrough: true }) response: Response,
  ) {
    const session = await this.loginService.createSession(body);

    response.cookie(
      SESSION_COOKIE_NAME,
      session.sessionToken,
      SESSION_COOKIE_OPTIONS,
    );

    return {
      user: session.user,
    };
  }

  @Get('me')
  async me(@Req() request: Request) {
    const sessionToken =
      typeof request.cookies?.[SESSION_COOKIE_NAME] === 'string'
        ? request.cookies[SESSION_COOKIE_NAME]
        : undefined;
    const user = await this.loginService.getSessionUser(sessionToken);

    return {
      user,
    };
  }

  @Post('logout')
  logout(@Res({ passthrough: true }) response: Response) {
    this.loginService.clearSession(response);

    return {
      success: true,
    };
  }
}
