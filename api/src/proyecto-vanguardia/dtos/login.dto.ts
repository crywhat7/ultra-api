import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';
export class LoginDto {
  @ApiProperty({
    description: 'Alias',
    example: 'arisu',
  })
  @IsString()
  @IsNotEmpty()
  alias: string;

  @ApiProperty({
    description: 'Contraseña',
    example: '***',
  })
  @IsString()
  @IsNotEmpty()
  password: string;
}
