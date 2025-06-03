import { BadRequestException, Injectable, NotFoundException, UnauthorizedException } from '@nestjs/common';
import { PrismaService } from 'prisma/prisma.service';
import * as argon2 from 'argon2';
import { JwtService } from '@nestjs/jwt';
import { IUser } from 'src/types/types';
import { UserService } from 'src/user/user.service';
import { ConfigService } from '@nestjs/config';
import { CreateUserDto } from 'src/user/dto/create-user.dto';


@Injectable()
export class AuthService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly jwtService: JwtService,
    private readonly userService: UserService,
    private readonly configService: ConfigService
  ) {}

  async signUp(createUserDto: CreateUserDto) {
    const userExists = await this.userService.findOne(createUserDto.email);
    if (userExists) {
      throw new BadRequestException('User already exists');
    }
  
    // const hash = await this.hashData(createUserDto.password);
    
    const newUser = await this.userService.create({
      ...createUserDto,
      refresh_token: "",
    });
  
    const tokens = await this.getTokens(newUser.user.id.toString(), newUser.user.full_name, newUser.user.email);
    
    await this.updateRefreshToken(newUser.user.id.toString(), tokens.refresh_token);
    
    return tokens;
  }

  async login(email: string, password: string) {
    const user = await this.userService.findOne(email);
    if (!user) throw new BadRequestException('User does not exist');
    const passwordMatches = await argon2.verify(user.password, password);
    if (!passwordMatches)
      throw new BadRequestException('Password is incorrect');
    const tokens = await this.getTokens(user.id.toString(), user.full_name, user.email);
    await this.updateRefreshToken(user.id.toString(), tokens.refresh_token);
    return tokens;
  }

  async findOne(email: string) {
    if (!email) {
      return new BadRequestException("email: ", email);
    }
    return await this.prisma.user.findUnique({
      where: {email},
      select: {
        id: true,
        full_name: true,
        department: true,
        emergency_contact: true,
        role: true,
        access_permissions: true
      }
    });
  }
  hashData(data: string) {
    return argon2.hash(data);
  }

  async updateRefreshToken(userId: string, refresh_token: string) {
    const hashedRefreshToken = await this.hashData(refresh_token);
    await this.userService.update({
      refresh_token: hashedRefreshToken.toString(),
    }, Number(userId));
  }

  async validateUser(email: string, password: string) {
    const user = await this.prisma.user.findUnique({where: {email}})
    if (!user) {
      throw new BadRequestException("There is no such a user")
    }
    const passwordIsMatch = await argon2.verify(user.password, password)
    if (user && passwordIsMatch){
      return user
    }
    throw new UnauthorizedException('User or password is incorrect')
  }


  async getTokens(userId: string, username: string, email: string) {
    const [access_token, refresh_token] = await Promise.all([
      this.jwtService.signAsync(
        {
          sub: userId,
          username,
          email
        },
        {
          secret: this.configService.get<string>('JWT_ACCESS_SECRET'),
          expiresIn: '15m',
        },
      ),
      this.jwtService.signAsync(
        {
          sub: userId,
          username,
          email
        },
        {
          secret: this.configService.get<string>('JWT_REFRESH_SECRET'),
          expiresIn: '7d',
        },
      ),
    ]);

    return {
      access_token: access_token ?? "",
      refresh_token: refresh_token ?? "",
    };
  }
  async logout(userId: string) {
    return this.userService.update({ refresh_token: "" }, Number(userId));
  }
}
