// camera.service.ts - Updated to include streaming functionality
import { BadRequestException, Injectable, NotFoundException, Logger } from '@nestjs/common';
import { CreateCameraDto } from './dto/create-camera.dto';
import { UpdateCameraDto } from './dto/update-camera.dto';
import { PrismaService } from 'prisma/prisma.service';
import { Prisma } from '@prisma/client';
import { Camera } from './entities/camera.entity';
import { spawn, ChildProcess } from 'child_process';
import { EventEmitter } from 'events';

@Injectable()
export class CameraService extends EventEmitter {
  private readonly logger = new Logger(CameraService.name);
  private activeStreams: Map<number, ChildProcess> = new Map();

  constructor(
    private readonly prisma: PrismaService,
  ) {
    super();
  }

  // Existing CRUD methods remain the same
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
    console.log('Camera service - userId received:', userId);
    console.log('Camera service - userId type:', typeof userId);
    console.log('Camera service - userId is NaN:', isNaN(userId));
  
    if (!userId || isNaN(userId)) {
      throw new BadRequestException(`Valid User ID is required. Received: ${userId}`);
    }
  
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

    // Stop streaming if active before removing
    this.stopCameraStream(id);

    return await this.prisma.camera.delete({where: {id}});
  }

  // NEW STREAMING METHODS
  async startCameraStream(cameraId: number, userId: number): Promise<void> {
    // Verify camera exists and user has access
    const camera = await this.prisma.camera.findFirst({
      where: {
        id: cameraId,
        responsible_person_id: userId,
      },
    });

    if (!camera) {
      throw new NotFoundException('Camera not found or access denied');
    }

    if (this.activeStreams.has(cameraId)) {
      this.logger.warn(`Camera ${cameraId} stream is already running`);
      return;
    }

    let ffmpegArgs: string[];

    if (camera.rtsp_address) {
      // Use RTSP stream
      ffmpegArgs = [
        '-rtsp_transport', 'tcp',
        '-i', camera.rtsp_address,
        '-vf', 'scale=640:480',
        '-r', '30',
        '-f', 'mjpeg',
        '-q:v', '5',
        'pipe:1'
      ];
    } else {
      // Use local USB camera (fallback)
      ffmpegArgs = [
        '-f', 'v4l2',           // Linux (use 'dshow' for Windows)
        '-i', `/dev/video${cameraId}`,
        '-vf', 'scale=640:480',
        '-r', '30',
        '-f', 'mjpeg',
        '-q:v', '5',
        'pipe:1'
      ];
    }

    const ffmpegProcess = spawn('ffmpeg', ffmpegArgs);
    this.activeStreams.set(cameraId, ffmpegProcess);

    ffmpegProcess.stdout.on('data', (data: Buffer) => {
      this.emit('frame', { cameraId, frameBuffer: data });
    });

    ffmpegProcess.stderr.on('data', (data: Buffer) => {
      this.logger.debug(`FFmpeg stderr for camera ${cameraId}: ${data.toString()}`);
    });

    ffmpegProcess.on('close', (code) => {
      this.logger.log(`FFmpeg process for camera ${cameraId} closed with code ${code}`);
      this.activeStreams.delete(cameraId);
    });

    ffmpegProcess.on('error', (error) => {
      this.logger.error(`FFmpeg error for camera ${cameraId}: ${error.message}`);
      this.activeStreams.delete(cameraId);
    });

    // Update camera status to 'streaming'
    await this.prisma.camera.update({
      where: { id: cameraId },
      data: { status: 'streaming' },
    });

    this.logger.log(`Camera ${cameraId} stream started`);
  }

  stopCameraStream(cameraId: number): void {
    const ffmpegProcess = this.activeStreams.get(cameraId);
    
    if (ffmpegProcess) {
      ffmpegProcess.kill('SIGTERM');
      this.activeStreams.delete(cameraId);
      this.logger.log(`Camera ${cameraId} stream stopped`);
      
      // Update camera status
      this.prisma.camera.update({
        where: { id: cameraId },
        data: { status: 'offline' },
      }).catch(error => {
        this.logger.error(`Failed to update camera ${cameraId} status: ${error.message}`);
      });
    }
  }

  getCameraStreamingStatus(cameraId: number): boolean {
    return this.activeStreams.has(cameraId);
  }

  getActiveStreams(): number[] {
    return Array.from(this.activeStreams.keys());
  }

  // Method to process frame for AI analysis
  async processFrameForAI(cameraId: number, frameBuffer: Buffer): Promise<any> {
    const camera = await this.prisma.camera.findUnique({ where: { id: cameraId } });
    
    // Here you would integrate with your AI model
    // For now, return mock data
    const mockResult = {
      cameraId,
      location: camera?.location,
      timestamp: new Date().toISOString(),
      detections: [
        {
          type: 'person',
          confidence: 0.95,
          bbox: [100, 100, 200, 300],
          danger_level: 'low'
        }
      ],
      is_dangerous: Math.random() > 0.9 // 10% chance of danger for demo
    };

    return mockResult;
  }

  // Cleanup method to stop all streams
  async cleanup(): Promise<void> {
    const activeStreamIds = Array.from(this.activeStreams.keys());
    
    for (const cameraId of activeStreamIds) {
      this.stopCameraStream(cameraId);
    }
    
    this.logger.log('All camera streams stopped');
  }
}