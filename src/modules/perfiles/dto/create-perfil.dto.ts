import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsOptional, IsString } from 'class-validator';
import { validationMessages} from '../../../common/validators/validation-messages'

export class CreatePerfilDto {
  
  @IsNotEmpty({ message: validationMessages.isNotEmpty })
  @IsString({ message: validationMessages.isString })
  @ApiProperty({
    example: 'Supervisor',
    description: 'ingrese un nombre de perfil',
  })
  nombre: string;

  @IsOptional()
  @IsString({ message: validationMessages.isString })
  @ApiProperty({
    example: 'El supervisor se encarga de...',
    description: 'ingrese una descripcion del perfil',
    required: false,
  })
  descripcion: string;
}
