// camera.module.ts - Updated module with all dependencies
import { Module } from '@nestjs/common';
import { CameraController } from './camera.controller';
import { CameraService } from './camera.service';
import { PrismaService } from 'prisma/prisma.service';
import { JwtModule } from '@nestjs/jwt';
import { WebSocketCameraGateway } from './camera.gateway';

@Module({
  imports: [
    JwtModule.register({
      secret: process.env.JWT_SECRET,
      signOptions: { expiresIn: '24h' },
    }),
  ],
  controllers: [CameraController],
  providers: [CameraService, WebSocketCameraGateway, PrismaService],
  exports: [CameraService], // Export service if needed by other modules
})
export class CameraModule {}