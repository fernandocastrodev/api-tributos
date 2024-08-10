import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';

export class HashPasswordDto {
  @IsNotEmpty()
  @IsString()
  @ApiProperty({
    example: 'clave',
    description: 'ingrese una password',
  })
  password: string;
}
