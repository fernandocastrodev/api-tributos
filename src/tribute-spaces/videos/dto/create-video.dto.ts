import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsOptional, IsString } from 'class-validator';
import { validationMessages } from '../../../common/validators/validation-messages';

export class CreateVideoDto {

  @IsNotEmpty({ message: validationMessages.isNotEmpty })
  @IsString({ message: validationMessages.isString })
  @ApiProperty({
    example: 'www.misvideos.cl/mi-video.jpg',
    description: 'ingrese la url del video',
  })
  url: string;

  @IsOptional()
  @IsNotEmpty({ message: validationMessages.isNotEmpty })
  @IsString({ message: validationMessages.isString })
  @ApiProperty({
    example: 'video del tributo',
    description: 'ingrese una descripcion del video',
    required: false,
  })
  descripcion: string;

  @IsNotEmpty({ message: validationMessages.isNotEmpty })
  @IsString({ message: validationMessages.isString })
  @ApiProperty({
    example: '1',
    description: 'ingrese una idGaleria',
  })
  idGaleria: string;
}
