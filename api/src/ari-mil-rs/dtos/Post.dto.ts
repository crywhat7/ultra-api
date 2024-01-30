import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';
export class CreatePostDTO {
  @ApiProperty({
    description: 'Contenido de la publicación',
    example: 'Hola a todos 🌐',
  })
  @IsString()
  @IsNotEmpty()
  content: string;

  @ApiProperty({
    description: 'Usuario que publica',
    example: '8024f82a-9e13-43d5-880a-631668982c3d',
  })
  @IsString()
  @IsNotEmpty()
  user: string;
}
