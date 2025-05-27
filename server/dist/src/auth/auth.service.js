"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthService = void 0;
const common_1 = require("@nestjs/common");
const prisma_service_1 = require("../../prisma/prisma.service");
const argon2 = require("argon2");
const jwt_1 = require("@nestjs/jwt");
const user_service_1 = require("../user/user.service");
const config_1 = require("@nestjs/config");
let AuthService = class AuthService {
    constructor(prisma, jwtService, userService, configService) {
        this.prisma = prisma;
        this.jwtService = jwtService;
        this.userService = userService;
        this.configService = configService;
    }
    async signUp(createUserDto) {
        const userExists = await this.userService.findOne(createUserDto.email);
        if (userExists) {
            throw new common_1.BadRequestException('User already exists');
        }
        const newUser = await this.userService.create({
            ...createUserDto,
            refresh_token: "",
        });
        const tokens = await this.getTokens(newUser.user.id.toString(), newUser.user.full_name);
        await this.updateRefreshToken(newUser.user.id.toString(), tokens.refresh_token);
        return tokens;
    }
    async login(email, password) {
        const user = await this.userService.findOne(email);
        if (!user)
            throw new common_1.BadRequestException('User does not exist');
        const passwordMatches = await argon2.verify(user.password, password);
        if (!passwordMatches)
            throw new common_1.BadRequestException('Password is incorrect');
        const tokens = await this.getTokens(user.id.toString(), user.full_name);
        await this.updateRefreshToken(user.id.toString(), tokens.refresh_token);
        return tokens;
    }
    async findOne(email) {
        return await this.prisma.user.findUnique({
            where: { email },
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
    hashData(data) {
        return argon2.hash(data);
    }
    async updateRefreshToken(userId, refresh_token) {
        const hashedRefreshToken = await this.hashData(refresh_token);
        await this.userService.update({
            refresh_token: hashedRefreshToken.toString(),
        }, Number(userId));
    }
    async validateUser(email, password) {
        const user = await this.prisma.user.findUnique({ where: { email } });
        if (!user) {
            throw new common_1.BadRequestException("There is no such a user");
        }
        const passwordIsMatch = await argon2.verify(user.password, password);
        if (user && passwordIsMatch) {
            return user;
        }
        throw new common_1.UnauthorizedException('User or password is incorrect');
    }
    async getTokens(userId, username) {
        const [access_token, refresh_token] = await Promise.all([
            this.jwtService.signAsync({
                sub: userId,
                username,
            }, {
                secret: this.configService.get('JWT_ACCESS_SECRET'),
                expiresIn: '15m',
            }),
            this.jwtService.signAsync({
                sub: userId,
                username,
            }, {
                secret: this.configService.get('JWT_REFRESH_SECRET'),
                expiresIn: '7d',
            }),
        ]);
        return {
            access_token: access_token ?? "",
            refresh_token: refresh_token ?? "",
        };
    }
    async logout(userId) {
        return this.userService.update({ refresh_token: "" }, Number(userId));
    }
};
exports.AuthService = AuthService;
exports.AuthService = AuthService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService,
        jwt_1.JwtService,
        user_service_1.UserService,
        config_1.ConfigService])
], AuthService);
//# sourceMappingURL=auth.service.js.map