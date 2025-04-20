import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateIncidentDto } from './dto/create-incident.dto';
import { UpdateIncidentDto } from './dto/update-incident.dto';
import { PrismaService } from 'prisma/prisma.service';
import { IIncidentFilters } from 'src/types/types';
import { IncidentFilterDto } from './dto/incident-filter.dto';
import { Prisma } from '@prisma/client';


@Injectable()
export class IncidentService {
  constructor(
    private readonly prisma: PrismaService,
  ) {}

  async create(createIncidentDto: CreateIncidentDto) {
    const data: any = {
      timestamp: new Date(),
      type: createIncidentDto.type,
      severity: createIncidentDto.severity,
      status: createIncidentDto.status,
      detected_by_camera_id: createIncidentDto.detected_by_camera_id,
    };
  
    if (createIncidentDto.worker_id) {
      data.worker_id = createIncidentDto.worker_id;
    }
  
    return await this.prisma.incident.create({
      data,
      include: {
        detected_by_camera: true,
        worker: true,
      }
    });
  }

  async findAll(userId: number, userRole: string, filters: IncidentFilterDto) {
    const where: any = {};
    
    if (filters.fromDate || filters.toDate) {
      where.timestamp = {};
      if (filters.fromDate) where.timestamp.gte = new Date(filters.fromDate);
      if (filters.toDate) where.timestamp.lte = new Date(filters.toDate);
    }
  
    if (filters.severity) where.severity = filters.severity;
    if (filters.status) where.status = filters.status;
    if (filters.workerIds?.length) where.worker_id = { in: filters.workerIds };
  
    return await this.prisma.incident.findMany({
      where,
      include: {
        detected_by_camera: true,
        worker: true,
      },
    });
  }

  async findOne(id: number) {
    return await this.prisma.incident.findUnique({
      where: {id}
    })
  }

  async update(id: number, updateIncidentDto: UpdateIncidentDto) {
    const inc = await this.prisma.incident.findUnique({where: {id}})
    if (!inc) throw new NotFoundException('Incident not found!');

    const data: Prisma.IncidentUpdateInput = {};
    if (updateIncidentDto.severity) {
      data.severity = updateIncidentDto.severity;
    }
    if (updateIncidentDto.status) {
      data.status = updateIncidentDto.status;
    }
    if (updateIncidentDto.type) {
      data.type = updateIncidentDto.type;
    }
    if (updateIncidentDto.timestamp) {
      data.timestamp = updateIncidentDto.timestamp;
    }
    if (updateIncidentDto.detected_by_camera_id) {
      data.detected_by_camera = {
        connect: { id: updateIncidentDto.detected_by_camera_id },
      };
    }
    if (updateIncidentDto.worker_id) {
      data.worker = {
        connect: { id: updateIncidentDto.worker_id },
      };
    }
  
    return await this.prisma.incident.update({
      where: {
        id: id,
      },
      data: data,
    });
  }

  async remove(id: number) {
    const inc = await this.prisma.incident.findUnique({ where: { id } });
    if (!inc) throw new NotFoundException('Incident not found!');
    return await this.prisma.incident.delete({
      where: {
        id: id,
      }
    });
  }
}
