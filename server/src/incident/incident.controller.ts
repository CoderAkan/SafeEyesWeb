import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards, UsePipes, ValidationPipe, Req, Query } from '@nestjs/common';
import { IncidentService } from './incident.service';
import { CreateIncidentDto } from './dto/create-incident.dto';
import { UpdateIncidentDto } from './dto/update-incident.dto';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';
import { IncidentFilterDto } from './dto/incident-filter.dto';


@Controller('incident')
export class IncidentController {
  constructor(private readonly incidentService: IncidentService) {}

  @Post()
  create(@Body() createIncidentDto: CreateIncidentDto) {
    return this.incidentService.create(createIncidentDto);
  }

  @Get()
  @UseGuards(JwtAuthGuard)
  findAll(@Req() req, @Query() filters: IncidentFilterDto) {
    return this.incidentService.findAll(+req.user.id, req.user.role, filters);
  }

  @Get(':id')
  @UseGuards(JwtAuthGuard)
  findOne(@Param('id') id: string) {
    return this.incidentService.findOne(+id);
  }

  @Patch(':id')
  @UseGuards(JwtAuthGuard)
  update(@Param('id') id: string, @Body() updateIncidentDto: UpdateIncidentDto) {
    return this.incidentService.update(+id, updateIncidentDto);
  }

  @Delete(':id')
  @UseGuards(JwtAuthGuard)
  remove(@Param('id') id: string) {
    return this.incidentService.remove(+id);
  }
}
