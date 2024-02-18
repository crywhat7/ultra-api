import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsNumber } from 'class-validator';
export class UpdatePrecioProductDto {
  @ApiProperty({
    description: 'Id del tipo de Unidad',
    example: 1,
  })
  @IsNumber()
  @IsNotEmpty()
  idTipoUnidad: number;

  @ApiProperty({
    description: 'Nuevo precio',
    example: 15,
  })
  @IsNumber()
  @IsNotEmpty()
  precio: number;
}
