import { ApiProperty } from '@nestjs/swagger';
import { IsBoolean, IsNotEmpty, IsString } from 'class-validator';
export class CreateEstadoDto {
  @ApiProperty({
    description: 'Descripción',
    example: 'Abierto',
  })
  @IsString()
  @IsNotEmpty()
  descripcion: string;

  @ApiProperty({
    description: 'Terminado',
    example: false,
  })
  @IsBoolean()
  @IsNotEmpty()
  terminado: boolean;
}
