/* eslint-disable linebreak-style */
import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsNumber, IsString } from 'class-validator';
export class CreateProductDto {
  @ApiProperty({
    description: 'Descripcion',
    example: 'Tomate fresco',
  })
  @IsString()
  @IsNotEmpty()
  descripcion: string;

  @ApiProperty({
    description: 'Id de la Subclase',
    example: 2,
  })
  @IsNumber()
  @IsNotEmpty()
  idSubclase: number;

  @ApiProperty({
    description: 'Id de la Marca',
    example: 2,
  })
  @IsNumber()
  @IsNotEmpty()
  idMarca: number;
}
