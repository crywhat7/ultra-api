import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';

export class CreateUserDTO {
  @ApiProperty({
    description: 'Nombre Completo',
    example: 'Kenneth Moises Cubas Lopez',
  })
  @IsString()
  @IsNotEmpty()
  fullname: string;

  @ApiProperty({
    description: 'Nombre de Usuario',
    example: 'kometha',
  })
  @IsString()
  @IsNotEmpty()
  username: string;

  @ApiProperty({
    description: 'Correo Electronico',
    example: 'kennethcubas93@gmail.com',
  })
  @IsString()
  @IsNotEmpty()
  email: string;

  @ApiProperty({
    description: 'Contraseña',
    example: '123456',
  })
  @IsString()
  @IsNotEmpty()
  password: string;

  @ApiProperty({
    description: 'Pais',
    example: 'dc3a5eed-cbef-4904-8365-c18a615aa88b',
  })
  @IsString()
  @IsNotEmpty()
  country: string;
}
