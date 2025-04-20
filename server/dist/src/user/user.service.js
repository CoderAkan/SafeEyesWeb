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
exports.UserService = void 0;
const common_1 = require("@nestjs/common");
const prisma_service_1 = require("../../prisma/prisma.service");
const argon2 = require("argon2");
const jwt_1 = require("@nestjs/jwt");
let UserService = class UserService {
    constructor(jwtService, prisma) {
        this.jwtService = jwtService;
        this.prisma = prisma;
    }
    async create(createUserDto) {
        const existUser = await this.prisma.user.findUnique({
            where: {
                email: createUserDto.email,
            }
        });
        if (existUser) {
            throw new common_1.BadRequestException('This email already exists');
        }
        const user = await this.prisma.user.create({
            data: {
                email: createUserDto.email,
                password: await argon2.hash(createUserDto.password),
                full_name: createUserDto.full_name,
                emergency_contact: createUserDto.emergency_contact,
                role: createUserDto.role,
                department: createUserDto.department,
                access_permissions: createUserDto.access_permissions
            }
        });
        const token = this.jwtService.sign({ email: createUserDto.email });
        return { user, token };
    }
    async findOne(email) {
        return await this.prisma.user.findUnique({
            where: { email },
            select: {
                full_name: true,
                department: true,
                emergency_contact: true,
                role: true,
                access_permissions: true
            }
        });
    }
    async update(updateUserDto, userId) {
        const data = {};
        if (updateUserDto.full_name) {
            data.full_name = updateUserDto.full_name;
        }
        if (updateUserDto.department) {
            data.department = updateUserDto.department;
        }
        if (updateUserDto.access_permissions) {
            data.access_permissions = updateUserDto.access_permissions;
        }
        if (updateUserDto.emergency_contact) {
            data.emergency_contact = updateUserDto.emergency_contact;
        }
        if (updateUserDto.role) {
            data.role = updateUserDto.role;
        }
        return await this.prisma.user.update({
            where: {
                id: userId,
            },
            data: data,
        });
    }
};
exports.UserService = UserService;
exports.UserService = UserService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [jwt_1.JwtService,
        prisma_service_1.PrismaService])
], UserService);
//# sourceMappingURL=user.service.js.map