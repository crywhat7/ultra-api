import { ApiProperty } from '@nestjs/swagger';
import { IsBoolean, IsNotEmpty, IsString } from 'class-validator';
export class SetStatusAndObvservacionesDto {
  @ApiProperty({
    description: 'Observaciones',
    example: 'Despedido por mal comportamiento',
  })
  @IsString()
  @IsNotEmpty()
  observaciones: string;

  @ApiProperty({
    description: 'Nuevo estado',
    example: true,
  })
  @IsBoolean()
  @IsNotEmpty()
  inhabilitado: boolean;
}
