import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { CreatePpeDto } from './dto/create-ppe.dto';
import { UpdatePpeDto } from './dto/update-ppe.dto';
import { PrismaService } from 'prisma/prisma.service';
import { Prisma } from '@prisma/client';

@Injectable()
export class PpeService {
  constructor(
    private readonly prisma: PrismaService,
  ) {}

  async create(createPpeDto: CreatePpeDto, userId: number) {
    const ppe = await this.prisma.pPE.findMany({
      where: {
        assigned_to_user_id: userId,
        type: createPpeDto.type,
      }
    });

    if (ppe.length) throw new BadRequestException('This worker already has this item');
    return await this.prisma.pPE.create({
      data: {
        type: createPpeDto.type,
        status: createPpeDto.status,
        last_inspection_date: createPpeDto.last_inspection_date,
        assigned_to_user_id: userId,
        id: createPpeDto.id,
      },
    });
  }

  async findAll(id: number) {
    return await this.prisma.pPE.findMany({
      where: {
        assigned_to_user: {id},
      },
    })
  }

  async findOne(ppeId: number) {
    if (ppeId == undefined) {
      throw new BadRequestException("Your id is undefined")
    }
    return await this.prisma.pPE.findUnique({ where: { id: ppeId } });
  }

  async update(id: number, updatePpeDto: UpdatePpeDto, userId: number) {
    const ppe = await this.prisma.pPE.findUnique({ where: { id } });
    if (!ppe) throw new NotFoundException('PPE not found!');

    const data: Prisma.PPEUpdateInput = {};
    if (updatePpeDto.type) {
      data.type = updatePpeDto.type;
    }
    if (updatePpeDto.status) {
      data.status = updatePpeDto.status;
    }
    if (updatePpeDto.last_inspection_date) {
      data.last_inspection_date = updatePpeDto.last_inspection_date;
    }
  
    return await this.prisma.pPE.update({
      where: {
        id: id,
      },
      data: data,
    });
  }

  async remove(id: number) {
    const ppe = await this.prisma.pPE.findUnique({ where: { id } });
    if (!ppe) throw new NotFoundException('PPE not found!');
    return await this.prisma.pPE.delete({
      where: {
        id: id,
      }
    });
  }
}
