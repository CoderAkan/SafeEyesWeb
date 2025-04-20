import { PartialType } from '@nestjs/mapped-types';
import { CreatePpeDto } from './create-ppe.dto';

export class UpdatePpeDto extends PartialType(CreatePpeDto) {}
