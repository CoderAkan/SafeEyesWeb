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
      full_name: createUserDto.full_name,
      emergency_contact: createUserDto.emergency_contact || "+7 777 777 7777",
      role: createUserDto.role || "Worker",
      department: createUserDto.department || "IT",
      access_permissions: createUserDto.access_permissions || ["No camera", "Notifications", "Worker"],
    }
    return this.authService.signUp(data)
  }

  @Post('login')
  @UseGuards(LocalAuthGuard)
  async login(@Request() req) {
    const tokens = await this.authService.getTokens(req.user.id.toString(), req.user.full_name, req.user.email);
    await this.authService.updateRefreshToken(req.user.id.toString(), tokens.refresh_token);
    return tokens;
   }

  @Get('profile')
  @UseGuards(JwtAuthGuard)
  getProfile(@Request() req) {
    return this.authService.findOne(req.user.email);
  }
}
