import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { UserModule } from 'src/user/user.module';
import { PassportModule } from '@nestjs/passport';
import { LocalStrategy } from './strategies/local.strategy';
import { JwtModule } from '@nestjs/jwt';
import { ConfigModule, ConfigService } from '@nestjs/config';
// import { JwtStrategy } from './strategies/jwt.strategy';
import { AccessTokenStrategy } from './strategies/access_token.strategy';
import { RefreshTokenStrategy } from './strategies/refresh_token.strategy';

@Module({
  imports: [UserModule, PassportModule, JwtModule.register({})],
  controllers: [AuthController],
  providers: [AuthService, AccessTokenStrategy, RefreshTokenStrategy, LocalStrategy], // JwtStrategy
})
export class AuthModule {}
