import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';

export class VerifyTokenDto {
  @IsNotEmpty()
  @IsString()
  @ApiProperty({
    example: 'token',
    description: 'ingrese un token',
  })
  token: string;
}