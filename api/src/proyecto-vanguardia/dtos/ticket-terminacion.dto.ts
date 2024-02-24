import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsNumber } from 'class-validator';
export class UpdateTerminacionTicketDto {
  @ApiProperty({
    description: 'Id de la nueva Terminación',
    example: 1,
  })
  @IsNumber()
  @IsNotEmpty()
  idTerminacion: number;
}
