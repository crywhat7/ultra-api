import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsNumber, IsString } from 'class-validator';
export class CreateVehiculoDTO {
  @ApiProperty({
    description: 'Marca del vehiculo',
    example: '8a0dfdb7-74f0-4628-852d-22a0faabc25f',
  })
  @IsString()
  @IsNotEmpty()
  brand: string;

  @ApiProperty({
    description: 'Modelo del vehiculo',
    example: 'd8d6210f-5bb0-4098-b582-6342541f8f42',
  })
  @IsString()
  @IsNotEmpty()
  model: string;

  @ApiProperty({
    description: 'Año del vehiculo',
    example: 2002,
  })
  @IsNumber()
  @IsNotEmpty()
  year: string;

  @ApiProperty({
    description: 'Color del vehiculo',
    example: 'Rojo',
  })
  @IsString()
  @IsNotEmpty()
  color: string;

  @ApiProperty({
    description: 'Tipo de transmisión del vehiculo',
    example: '21a5fe80-ffdb-41d3-a149-d3a9e3a0e485',
  })
  @IsString()
  @IsNotEmpty()
  transmission: string;
}
