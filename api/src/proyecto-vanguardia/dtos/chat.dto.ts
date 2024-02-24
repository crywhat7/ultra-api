import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsNumber, IsString } from 'class-validator';
export class CreateChatDto {
  @ApiProperty({
    description: 'Mensaje',
    example: 'Hola, que tal',
  })
  @IsString()
  @IsNotEmpty()
  message: string;

  @ApiProperty({
    description: 'Id del Usuario',
    example: 1,
  })
  @IsNumber()
  @IsNotEmpty()
  idUsuario: number;

  @ApiProperty({
    description: 'Id del Ticket',
    example: 1,
  })
  @IsNumber()
  @IsNotEmpty()
  idTicket: number;

  @ApiProperty({
    description: 'Imagen Opcional (BASE64)',
    example:
      'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABgAAAAYCAYAAADgdz34AAABjElEQVRIS+2VvUoDQRSGv',
  })
  @IsString()
  @IsNotEmpty()
  imagenBase64: string;
}
