import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsNumber } from 'class-validator';
export class UpdateStatusTicketDto {
  @ApiProperty({
    description: 'Id del nuevo Estado',
    example: 1,
  })
  @IsNumber()
  @IsNotEmpty()
  idEstado: number;
}
