import { PartialType } from '@nestjs/swagger';
import { CreateGaleriaDto } from './create-galeria.dto';

export class UpdateGaleriaDto extends PartialType(CreateGaleriaDto) {}
