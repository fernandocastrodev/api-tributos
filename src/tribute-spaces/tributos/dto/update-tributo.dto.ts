import { PartialType } from '@nestjs/swagger';
import { CreateTributoDto } from './create-tributo.dto';

export class UpdateTributoDto extends PartialType(CreateTributoDto) {}
