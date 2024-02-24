import { ApiProperty } from '@nestjs/swagger';
import { IsBoolean, IsNotEmpty, IsString } from 'class-validator';
export class CreateTerminacionDto {
  @ApiProperty({
    description: 'Descripción',
    example: 'Se resolvió el problema',
  })
  @IsString()
  @IsNotEmpty()
  descripcion: string;

  @ApiProperty({
    description: 'Fue Resolutoria',
    example: false,
  })
  @IsBoolean()
  @IsNotEmpty()
  fueResolutoria: boolean;
}
