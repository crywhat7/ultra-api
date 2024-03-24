import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';
export class AutoCompleteDto {
  @ApiProperty({
    description: 'Texto',
    example: 'Tengo un problema con Windows 11',
  })
  @IsString()
  @IsNotEmpty()
  text: string;
}
