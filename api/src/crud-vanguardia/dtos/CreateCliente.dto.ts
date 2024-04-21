import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsNumber, IsString } from 'class-validator';
export class CreateClienteCrudDto {
  @ApiProperty({
    description: 'Nombre',
    example: 'Keneth',
  })
  @IsString()
  @IsNotEmpty()
  nombre: string;

  @ApiProperty({
    description: 'Apellido',
    example: 'Cubas',
  })
  @IsString()
  @IsNotEmpty()
  apellido: string;

  @ApiProperty({
    description: 'Saldo',
    example: 956511,
  })
  @IsNumber()
  @IsNotEmpty()
  saldo: number;

  @ApiProperty({
    description: 'Direccion',
    example: 'Cubas',
  })
  @IsString()
  @IsNotEmpty()
  direccion: string;
}
