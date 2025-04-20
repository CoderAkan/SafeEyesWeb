import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards, ValidationPipe, UsePipes, Req, UnauthorizedException } from '@nestjs/common';
import { CameraService } from './camera.service';
import { CreateCameraDto } from './dto/create-camera.dto';
import { UpdateCameraDto } from './dto/update-camera.dto';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';

@Controller('camera')
export class CameraController {
  constructor(private readonly cameraService: CameraService) {}

  @Post()
  @UseGuards(JwtAuthGuard)
  @UsePipes(new ValidationPipe())
  create(@Body() createCameraDto: CreateCameraDto, @Req() req) {
    console.log("User ID from JWT:", req.user?.id);
    if (!req.user?.id) {
        throw new UnauthorizedException("User ID is missing");
    }
    return this.cameraService.create(createCameraDto, +req.user.id);  }

  @Get()
  @UseGuards(JwtAuthGuard)
  findAll(@Req() req) {
    return this.cameraService.findAll(+req.user.id);
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
}
