import { ApiProperty } from '@nestjs/swagger';
import { Transform } from 'class-transformer';
import { IsEmail, IsString, MinLength } from 'class-validator';

export class LoginDto {
  @IsEmail()
  @ApiProperty({
    example: 'persona@example.com',
    description: 'correo de usuario',
  })
  correo: string;

  @IsString()
  @MinLength(6)
  @Transform(({ value }) => value.trim())
  @ApiProperty({
    example: 'replace_with_test_password',
    description: 'ingresar password',
  })
  claveAcceso: string;
}
