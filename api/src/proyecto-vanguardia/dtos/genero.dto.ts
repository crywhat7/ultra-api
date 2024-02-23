import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';
export class CreateGeneroDto {
  @ApiProperty({
    description: 'Descripción',
    example: 'Femenino',
  })
  @IsString()
  @IsNotEmpty()
  descripcion: string;
}
