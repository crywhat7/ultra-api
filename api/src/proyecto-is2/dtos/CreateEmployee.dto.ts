import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsNumber, IsString } from 'class-validator';
export class CreateEmployeeDto {
  @ApiProperty({
    description: 'Primer nombre',
    example: 'Kenneth',
  })
  @IsString()
  @IsNotEmpty()
  nombre: string;

  @ApiProperty({
    description: 'Primer apellido',
    example: 'Cubas',
  })
  @IsString()
  @IsNotEmpty()
  apellido: string;

  @ApiProperty({
    description: 'Correo electrónico',
    example: 'kennethcubas93@gmail.com',
  })
  @IsString()
  @IsNotEmpty()
  email: string;

  @ApiProperty({
    description: 'Teléfono',
    example: '+504 9561-9511',
  })
  @IsString()
  @IsNotEmpty()
  telefono: string;

  @ApiProperty({
    description: 'Id del Puesto',
    example: 6,
  })
  @IsNumber()
  @IsNotEmpty()
  idPuesto: number;

  @ApiProperty({
    description: 'Id del Genero',
    example: 2,
  })
  @IsNumber()
  @IsNotEmpty()
  idGenero: number;

  @ApiProperty({
    description: 'Alias',
    example: 'kometha',
  })
  @IsString()
  @IsNotEmpty()
  alias: string;

  @ApiProperty({
    description: 'Contraseña',
    example: '12345678',
  })
  @IsString()
  @IsNotEmpty()
  password: string;

  @ApiProperty({
    description: 'Salario',
    example: 16500,
  })
  @IsNumber()
  @IsNotEmpty()
  salario: number;

  @ApiProperty({
    description: 'Id del tipo de pago',
    example: 1,
  })
  @IsNumber()
  @IsNotEmpty()
  idTipoPago: number;
}
