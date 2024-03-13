import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';
export class CreateFacturaDto {
  @ApiProperty({
    description: 'DNI del cliente',
    example: '0801-2002-18826',
  })
  @IsString()
  @IsNotEmpty()
  dni: string;

  @ApiProperty({
    description: 'Nombre Completo del cliente',
    example: 'Milton Alejandro Barrientos Hernández',
  })
  @IsString()
  @IsNotEmpty()
  nombreCompleto: string;

  @ApiProperty({
    description: 'Teléfono del cliente',
    example: '+504 9561-9511',
  })
  @IsString()
  @IsNotEmpty()
  telefono: string;

  @ApiProperty({
    description: 'Id del empleado',
    example: 1,
  })
  @IsNotEmpty()
  idEmpleado: number;

  @ApiProperty({
    description: 'Id de la forma de pago',
    example: 1,
  })
  @IsNotEmpty()
  idFormaPago: number;

  @ApiProperty({
    description: 'Productos de la factura',
    example: [
      {
        idProducto: 1,
        idTipoUnidad: 1,
        cantidad: 2,
        precioUnitario: 10,
        subtotal: 20,
      },
    ],
  })
  @IsNotEmpty()
  productosFactura: {
    idProducto: number;
    idTipoUnidad: number;
    cantidad: number;
    precioUnitario: number;
    subtotal: number;
  }[];
}
