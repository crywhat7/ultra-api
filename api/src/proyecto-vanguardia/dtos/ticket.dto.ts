import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsNumber, IsString } from 'class-validator';
export class CreateTicketDto {
  @ApiProperty({
    description: 'Titulo',
    example: 'Problema con el sistema',
  })
  @IsString()
  @IsNotEmpty()
  titulo: string;

  @ApiProperty({
    description: 'Descripcion',
    example: 'Tengo problemas al momento de ingresar al sistema',
  })
  @IsString()
  @IsNotEmpty()
  descripcion: string;

  @ApiProperty({
    description: 'Id de Prioridad',
    example: 1,
  })
  @IsNumber()
  @IsNotEmpty()
  idPrioridad: number;

  @ApiProperty({
    description: 'Creado por (Id del Usuario)',
    example: 1,
  })
  @IsNumber()
  @IsNotEmpty()
  postBy: string;

  @ApiProperty({
    description: 'Imagen Principal (BASE64)',
    example:
      'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABgAAAAYCAYAAADgdz34AAABjElEQVRIS+2VvUoDQRSGv',
  })
  @IsString()
  @IsNotEmpty()
  imagenBase64: string;
}
