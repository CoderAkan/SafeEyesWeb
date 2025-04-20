import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateCameraDto } from './dto/create-camera.dto';
import { UpdateCameraDto } from './dto/update-camera.dto';
import { PrismaService } from 'prisma/prisma.service';
import { Prisma } from '@prisma/client';
import { Camera } from './entities/camera.entity';

@Injectable()
export class CameraService {
  constructor(
    private readonly prisma: PrismaService,
  ) {}

  async create(createCameraDto: CreateCameraDto, userId: number) {
    return await this.prisma.camera.create({
      data: {
        location: createCameraDto.location,
        status: createCameraDto.status,
        resolution: createCameraDto.resolution,
        last_maintenance: createCameraDto.last_maintenance,
        rtsp_address: createCameraDto.rtsp_address,
        responsible_person: {
          connect: { id: userId },
        },
      } as Prisma.CameraCreateInput,
    });  
  }

  async findAll(userId: number) {
    return await this.prisma.camera.findMany({
      where: {
        responsible_person_id: userId,
      },
      include: {
        responsible_person: true,
      },
    });
  }

  async findOne(id: number) {
    return await this.prisma.camera.findUnique({
      where: {id}
    });
  }

  async update(id: number, updateCameraDto: UpdateCameraDto) {
    const camera = await this.prisma.camera.findUnique({ where: { id } });
    if (!camera) throw new NotFoundException('Camera not found!');

    const data: Prisma.CameraUpdateInput = {};
    if (updateCameraDto.resolution) {
      data.resolution = updateCameraDto.resolution;
    }
    if (updateCameraDto.status) {
      data.status = updateCameraDto.status;
    }
    if (updateCameraDto.location) {
      data.location = updateCameraDto.location;
    }
    if (updateCameraDto.last_maintenance) {
      data.last_maintenance = updateCameraDto.last_maintenance;
    }
    if (updateCameraDto.rtsp_address) {
      data.rtsp_address = updateCameraDto.rtsp_address;
    }

    return await this.prisma.camera.update({
      where: {
        id: id,
      },
      data: data,
    });
  }

  async remove(id: number) {
    const camera = await this.prisma.camera.findUnique({ where: { id } });
    if (!camera) throw new NotFoundException('Camera not found!');

    return await this.prisma.camera.delete({where: {id}});
  }
}
