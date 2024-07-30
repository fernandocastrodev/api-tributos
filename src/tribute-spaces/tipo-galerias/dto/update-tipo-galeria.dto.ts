import { PartialType } from '@nestjs/swagger';
import { CreateTipoGaleriaDto } from './create-tipo-galeria.dto';

export class UpdateTipoGaleriaDto extends PartialType(CreateTipoGaleriaDto) {}
