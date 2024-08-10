import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';

export class EncryptDecryptDto {
  @IsNotEmpty()
  @IsString()
  @ApiProperty({
    example: 'texto',
    description: 'ingrese un texto',
  })
  text: string;
}