import { BadRequestException, Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { PrismaService } from 'prisma/prisma.service';
import * as argon2 from 'argon2';
import { JwtService } from '@nestjs/jwt';
import { Prisma } from '@prisma/client';
import { hash } from 'crypto';

@Injectable()
export class UserService {
  constructor(
    private readonly jwtService: JwtService,
    private readonly prisma: PrismaService,
  ) {}

  async create(createUserDto: CreateUserDto) {
    const existUser = await this.prisma.user.findUnique({
      where: {
        email: createUserDto.email,
      }
    });
    if (existUser){
      throw new BadRequestException('This email already exists')
    }
    const user = await this.prisma.user.create({
      data: {
        email: createUserDto.email,
        password: await argon2.hash(createUserDto.password),
        full_name: createUserDto.full_name,
        emergency_contact: createUserDto.emergency_contact,
        role: createUserDto.role,
        department: createUserDto.department,
        access_permissions: createUserDto.access_permissions,
      }
    })
    const token = this.jwtService.sign({email: createUserDto.email})
    return { user, token };
  }

  async findOne(email: string) {
    return await this.prisma.user.findUnique({
      where: {email},
      select: {
        full_name: true,
        department: true,
        emergency_contact: true,
        email: true,
        role: true,
        access_permissions: true,
        password: true,
        id: true
      }
    });
  }

  async findById(id: number) {
    return await this.prisma.user.findUnique({
      where: {id: id},
      select: {
        id: true,
        email: true,
        full_name: true,
        department: true,
        emergency_contact: true,
        role: true,
        access_permissions: true,
        password: true
      }
    })
  }

  async update(updateUserDto: UpdateUserDto, userId: number) {
    const data: Prisma.UserUpdateInput = {};
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

    if (updateUserDto.refresh_token) {
      data.refresh_token = updateUserDto.refresh_token
    }
    return await this.prisma.user.update({
      where: {
        id: userId,
      },
      data: data,
    });
  }
}
