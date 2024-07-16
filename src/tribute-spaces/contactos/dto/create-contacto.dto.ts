import { IsEmail, IsNotEmpty, IsString } from 'class-validator';

export class CreateContactoDto {
  @IsNotEmpty()
  @IsString()
  nombre: string;

  @IsString()
  @IsEmail()
  correo: string;

  @IsNotEmpty()
  @IsString()
  fono: string;

  @IsNotEmpty()
  @IsString()
  descripcion: string;
}
