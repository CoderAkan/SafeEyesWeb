import { Controller, Get, Post, Body, ValidationPipe, UsePipes, UseGuards, Param, Req, Patch } from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto } from './dto/create-user.dto';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';
import { UpdateUserDto } from './dto/update-user.dto';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post()
  @UsePipes(new ValidationPipe)
  create(@Body() createUserDto: CreateUserDto) {
    return this.userService.create(createUserDto);
  }

  @Get()
  @UseGuards(JwtAuthGuard)
  findOne(@Req() req) {
    return this.userService.findOne(req.user.email);
  }

  @Patch()
  @UseGuards(JwtAuthGuard)
  update(@Body() updateUserDto: UpdateUserDto, @Req() req) {
    return this.userService.update(updateUserDto, +req.user.id);
  }

  
}
