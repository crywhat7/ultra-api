import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';
export class CreatePrioridadDto {
  @ApiProperty({
    description: 'Descripción',
    example: 'Alta',
  })
  @IsString()
  @IsNotEmpty()
  descripcion: string;
}
