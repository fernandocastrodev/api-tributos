import { ApiProperty } from '@nestjs/swagger';
import { IsInt, IsNotEmpty, IsOptional, IsString } from 'class-validator';

export class CreateVideoDto {
  @IsNotEmpty()
  @IsString()
  @ApiProperty({
    example: 'www.misvideos.cl/mi-video.jpg',
    description: 'ingrese la url del video',
  })
  url: string;

  @IsOptional()
  @IsNotEmpty()
  @IsString()
  @ApiProperty({
    example: 'video del tributo',
    description: 'ingrese una descripcion del video',
    required: false,
  })
  descripcion: string;

  @IsNotEmpty()
  @IsString()
  @ApiProperty({
    example: '1',
    description: 'ingrese una idGaleria',
  })
  idGaleria: string;
}
