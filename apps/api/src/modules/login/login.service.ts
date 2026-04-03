import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import bcrypt from 'bcryptjs';
import type { Response } from 'express';
import { SESSION_COOKIE_NAME, SESSION_COOKIE_OPTIONS } from './login.constants';
import type { LoginRequestDto } from './dto/login-request.dto';
import { LoginRepository } from './login.repository';
import type { SessionTokenPayload, SessionUser } from './login.types';

@Injectable()
export class LoginService {
  constructor(
    private readonly jwtService: JwtService,
    private readonly loginRepository: LoginRepository,
  ) {}

  async createSession(credentials: LoginRequestDto) {
    const username = credentials.username.trim().toLowerCase();
    const user = await this.loginRepository.findByUsername(username);

    if (!user) {
      throw new UnauthorizedException('Kullanici adi veya sifre hatali.');
    }

    const passwordMatches = await bcrypt.compare(
      credentials.password,
      user.passwordHash,
    );

    if (!passwordMatches) {
      throw new UnauthorizedException('Kullanici adi veya sifre hatali.');
    }

    const sessionUser: SessionUser = {
      id: user.id,
      username: user.username,
      displayName: user.displayName,
      role: user.role,
    };

    const sessionToken = await this.jwtService.signAsync({
      sub: sessionUser.id,
    });

    return {
      sessionToken,
      user: sessionUser,
    };
  }

  async getSessionUser(sessionToken: string | undefined): Promise<SessionUser> {
    if (!sessionToken) {
      throw new UnauthorizedException('Oturum bulunamadi.');
    }

    const payload =
      await this.jwtService.verifyAsync<SessionTokenPayload>(sessionToken);

    const user = await this.loginRepository.findById(payload.sub);

    if (!user) {
      throw new UnauthorizedException('Oturum gecersiz.');
    }

    return user;
  }

  clearSession(response: Response): void {
    response.clearCookie(SESSION_COOKIE_NAME, {
      httpOnly: SESSION_COOKIE_OPTIONS.httpOnly,
      sameSite: SESSION_COOKIE_OPTIONS.sameSite,
      secure: SESSION_COOKIE_OPTIONS.secure,
      path: SESSION_COOKIE_OPTIONS.path,
    });
  }
}
