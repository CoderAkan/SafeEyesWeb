// camera.controller.ts - Updated with streaming endpoints
import { 
  Controller, 
  Get, 
  Post, 
  Body, 
  Patch, 
  Param, 
  Delete, 
  UseGuards, 
  ValidationPipe, 
  UsePipes, 
  Req, 
  UnauthorizedException,
  HttpStatus,
  HttpCode
} from '@nestjs/common';
import { CameraService } from './camera.service';
import { CreateCameraDto } from './dto/create-camera.dto';
import { UpdateCameraDto } from './dto/update-camera.dto';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';

@Controller('camera')
export class CameraController {
  constructor(private readonly cameraService: CameraService) {}

  // Existing CRUD endpoints
  @Post()
  @UseGuards(JwtAuthGuard)
  @UsePipes(new ValidationPipe())
  create(@Body() createCameraDto: CreateCameraDto, @Req() req) {
    const userId = Number(req.user.sub);
    if (!userId) {
        throw new UnauthorizedException("User ID is missing");
    }
    return this.cameraService.create(createCameraDto, userId);  
  }

  @Get()
  @UseGuards(JwtAuthGuard)
  findAll(@Req() req) {
    const userId = Number(req.user.sub);
    return this.cameraService.findAll(userId);
  }

  @Get(':id')
  @UseGuards(JwtAuthGuard)
  findOne(@Param('id') id: string) {
    return this.cameraService.findOne(+id);
  }

  @Patch(':id')
  @UseGuards(JwtAuthGuard)
  update(@Param('id') id: string, @Body() updateCameraDto: UpdateCameraDto) {
    return this.cameraService.update(+id, updateCameraDto);
  }

  @Delete(':id')
  @UseGuards(JwtAuthGuard)
  remove(@Param('id') id: string) {
    return this.cameraService.remove(+id);
  }

  // NEW STREAMING ENDPOINTS
  @Post(':id/stream/start')
  @UseGuards(JwtAuthGuard)
  @HttpCode(HttpStatus.OK)
  async startStream(@Param('id') id: string, @Req() req) {
    const userId = Number(req.user.sub);
    const cameraId = Number(id);
    
    if (!userId) {
      throw new UnauthorizedException("User ID is missing");
    }

    await this.cameraService.startCameraStream(cameraId, userId);
    
    return {
      message: 'Camera stream started successfully',
      cameraId,
      status: 'streaming'
    };
  }

  @Post(':id/stream/stop')
  @UseGuards(JwtAuthGuard)
  @HttpCode(HttpStatus.OK)
  stopStream(@Param('id') id: string) {
    const cameraId = Number(id);
    
    this.cameraService.stopCameraStream(cameraId);
    
    return {
      message: 'Camera stream stopped successfully',
      cameraId,
      status: 'stopped'
    };
  }

  @Get(':id/stream/status')
  @UseGuards(JwtAuthGuard)
  getStreamStatus(@Param('id') id: string) {
    const cameraId = Number(id);
    const isStreaming = this.cameraService.getCameraStreamingStatus(cameraId);
    
    return {
      cameraId,
      isStreaming,
      status: isStreaming ? 'streaming' : 'stopped',
      timestamp: new Date().toISOString()
    };
  }

  @Get('streams/active')
  @UseGuards(JwtAuthGuard)
  getActiveStreams(@Req() req) {
    const activeStreams = this.cameraService.getActiveStreams();
    
    return {
      activeStreams,
      count: activeStreams.length,
      timestamp: new Date().toISOString()
    };
  }

  @Post('streams/stop-all')
  @UseGuards(JwtAuthGuard)
  @HttpCode(HttpStatus.OK)
  async stopAllStreams() {
    await this.cameraService.cleanup();
    
    return {
      message: 'All camera streams stopped successfully',
      timestamp: new Date().toISOString()
    };
  }
}