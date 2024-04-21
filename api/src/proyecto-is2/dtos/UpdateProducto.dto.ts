/* eslint-disable linebreak-style */
import { ApiProperty } from '@nestjs/swagger';
import { IsBoolean, IsNotEmpty, IsNumber, IsString } from 'class-validator';
export class UpdateProductDto {
  @ApiProperty({
    description: 'Descripcion',
    example: 'Tomate fresco',
  })
  @IsString()
  @IsNotEmpty()
  descripcion: string;

  @ApiProperty({
    description: 'Id de la marca',
    example: 1,
  })
  @IsNumber()
  @IsNotEmpty()
  idMarca: number;

  @ApiProperty({
    description: 'Inhabilitado',
    example: true,
  })
  @IsBoolean()
  @IsNotEmpty()
  inhabilitado: boolean;

  @ApiProperty({
    description: 'Oferta',
    example: true,
  })
  @IsBoolean()
  @IsNotEmpty()
  oferta: boolean;
}
