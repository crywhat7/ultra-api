import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsNumber, IsString } from 'class-validator';
export class CreateUsuarioDto {
  @ApiProperty({
    description: 'Primer Nombre',
    example: 'Damaris',
  })
  @IsString()
  @IsNotEmpty()
  primerNombre: string;

  @ApiProperty({
    description: 'Segundo Nombre',
    example: 'Alicia',
  })
  @IsString()
  @IsNotEmpty()
  segundoNombre: string;

  @ApiProperty({
    description: 'Primer Apellido',
    example: 'Romero',
  })
  @IsString()
  @IsNotEmpty()
  primerApellido: string;

  @ApiProperty({
    description: 'Segundo Apellido',
    example: 'Flores',
  })
  @IsString()
  @IsNotEmpty()
  segundoApellido: string;

  @ApiProperty({
    description: 'Alias',
    example: 'arisu',
  })
  @IsString()
  @IsNotEmpty()
  alias: string;

  @ApiProperty({
    description: 'Contraseña',
    example: '123456',
  })
  @IsString()
  @IsNotEmpty()
  password: string;

  @ApiProperty({
    description: 'Fecha de Nacimiento',
    example: '2002-03-29',
  })
  @IsString()
  @IsNotEmpty()
  fechaNacimiento: string;

  @ApiProperty({
    description: 'Avatar URL Base64',
    example:
      'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABgAAAAYCAYAAADgdz34AAABjElEQVRIS+2VvUoDQRSGv',
  })
  @IsString()
  @IsNotEmpty()
  avatarUrlBase64: string;

  @ApiProperty({
    description: 'Rol',
    example: 1,
  })
  @IsNotEmpty()
  @IsNumber()
  idRol: number;

  @ApiProperty({
    description: 'Género',
    example: 1,
  })
  @IsNotEmpty()
  @IsNumber()
  idGenero: number;
}
