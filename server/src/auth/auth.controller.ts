import { Body, Controller, Get, Post, Req, Request, UseGuards } from '@nestjs/common';
import { AuthService } from './auth.service';
import { LocalAuthGuard } from './guards/local-auth.guard';
import { JwtAuthGuard } from './guards/jwt-auth.guard';
import { CreateUserDto } from 'src/user/dto/create-user.dto';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('signup')
  async signUp(@Body() createUserDto: CreateUserDto) {
    const data = {
      email: createUserDto.email,
      password: createUserDto.password,
      full_name: createUserDto.full_name || "",
      emergency_contact: createUserDto.emergency_contact || "",
      role: createUserDto.role || "USER",
      department: createUserDto.department || "GENERAL",
      access_permissions: createUserDto.access_permissions || [],
    }
    console.log(data);
    return this.authService.signUp(data)
  }

  @Post('login')
  @UseGuards(LocalAuthGuard)
  async login(@Request() req) {
    const tokens = await this.authService.getTokens(req.user.id.toString(), req.user.full_name);
    await this.authService.updateRefreshToken(req.user.id.toString(), tokens.refresh_token);
    return tokens;
   }

  @Get('profile')
  @UseGuards(JwtAuthGuard)
  getProfile(@Request() req) {
    return this.authService.findOne(req.user.email);
  }
}
