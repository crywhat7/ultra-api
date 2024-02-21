import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';
export class CreateClientDto {
  @ApiProperty({
    description: 'Nombre Completo',
    example: 'Milton Alejandro Barrientos Hernández',
  })
  @IsString()
  @IsNotEmpty()
  nombreCompleto: string;

  @ApiProperty({
    description: 'DNI',
    example: '0801-2002-18826',
  })
  @IsString()
  @IsNotEmpty()
  dni: string;

  @ApiProperty({
    description: 'Teléfono',
    example: '+504 9561-9511',
  })
  @IsString()
  @IsNotEmpty()
  telefono: string;
}
