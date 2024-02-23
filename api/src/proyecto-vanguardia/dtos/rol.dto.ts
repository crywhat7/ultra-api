import { ApiProperty } from '@nestjs/swagger';
import { IsBoolean, IsNotEmpty, IsString } from 'class-validator';
export class CreateRolDto {
  @ApiProperty({
    description: 'Descripción',
    example: 'Administrador',
  })
  @IsString()
  @IsNotEmpty()
  descripcion: string;

  @ApiProperty({
    description: 'Es Administrador',
    example: true,
  })
  @IsBoolean()
  @IsNotEmpty()
  esAdmin: boolean;
}
