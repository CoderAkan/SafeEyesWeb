import { Controller, Get, Post, Body, Patch, Param, Delete, Req, UseGuards, UsePipes, ValidationPipe } from '@nestjs/common';
import { PpeService } from './ppe.service';
import { CreatePpeDto } from './dto/create-ppe.dto';
import { UpdatePpeDto } from './dto/update-ppe.dto';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';

@Controller('ppe')
export class PpeController {
  constructor(private readonly ppeService: PpeService) {}

  @Post()
  @UseGuards(JwtAuthGuard)
  @UsePipes(new ValidationPipe())
  create(@Body() createPpeDto: CreatePpeDto, @Req() req) {
    return this.ppeService.create(createPpeDto, +req.user.id);
  }

  @Get()
  @UseGuards(JwtAuthGuard)
  findAll(@Req() req) {
    return this.ppeService.findAll(+req.user.id);
  }

  @Get(':id')
  @UseGuards(JwtAuthGuard)
  findOne(@Param('id') id: string) {
    return this.ppeService.findOne(+id);
  }

  @Patch(':id')
  @UseGuards(JwtAuthGuard)
  update(@Param('id') id: string, @Body() updatePpeDto: UpdatePpeDto, @Req() req) {
    return this.ppeService.update(+id, updatePpeDto, +req.user.id);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.ppeService.remove(+id);
  }
}
