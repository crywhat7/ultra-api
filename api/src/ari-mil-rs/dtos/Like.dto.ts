import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';
export class ToggleLikeDTO {
  @ApiProperty({
    description: 'Publicacion',
    example: 'd5695034-a7a7-4048-b132-faa932db70c8',
  })
  @IsString()
  @IsNotEmpty()
  idPost: string;

  @ApiProperty({
    description: 'Usuario que da o quita like',
    example: 'fb035bf6-4f04-45fa-be8b-186e6842e853',
  })
  @IsString()
  @IsNotEmpty()
  idUser: string;
}
