import { Module } from '@nestjs/common';
import { PpeService } from './ppe.service';
import { PpeController } from './ppe.controller';
import { PrismaModule } from 'prisma/prisma.module';

@Module({
  imports: [PrismaModule],
  controllers: [PpeController],
  providers: [PpeService],
})
export class PpeModule {}
