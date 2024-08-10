import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';

export class ComparePasswordsDto {
  @IsNotEmpty()
  @IsString()
  @ApiProperty({
    example: 'clave',
    description: 'ingrese una password',
  })
  password: string;

  @IsNotEmpty()
  @IsString()
  @ApiProperty({
    example: 'hash',
    description: 'ingrese una hash',
  })
  hash: string;
}
