import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { Request } from 'express';
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class RefreshTokenStrategy extends PassportStrategy(
  Strategy,
  'jwt-refresh',
) {
  constructor(private readonly configService: ConfigService) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      secretOrKey: configService.get<string>('JWT_REFRESH_SECRET', { infer: true }) || (() => {
        throw new Error('JWT_SECRET is not defined');
      })(),
      passReqToCallback: true,
    });
  }

  validate(req: Request, payload: any) {
    const authHeader = req.get('Authorization');
    
    if (!authHeader) {
      throw new UnauthorizedException('Authorization header is missing');
    }
    
    const refreshToken = authHeader.replace('Bearer', '').trim();
    
    if (!refreshToken) {
      throw new UnauthorizedException('Refresh token is missing');
    }
    
    return { ...payload, refreshToken };
  }
}