export const BASICS = `
id,
createdAt: created_at
`;

export const BASICS_WITH_DESCRIPTION = `
${BASICS},
descripcion
`;

export const dataItemPuesto = BASICS_WITH_DESCRIPTION;
export const dataItemGenero = BASICS_WITH_DESCRIPTION;
export const dataItemTipoPago = BASICS_WITH_DESCRIPTION;
export const dataItemFormaPago = BASICS_WITH_DESCRIPTION;
export const dataItemMarca = BASICS_WITH_DESCRIPTION;
export const dataItemTienda = BASICS_WITH_DESCRIPTION;

export const dataItemTipoUnidad = `${BASICS_WITH_DESCRIPTION}, permiteDecimales: permite_decimales, abreviacion`;
export const dataItemFamilia = `${BASICS_WITH_DESCRIPTION}, codigoFamilia: codigofamilia`;
export const dataItemCategoria = `${BASICS_WITH_DESCRIPTION}, codigoCategoria: codigocategoria, familia: familias (${dataItemFamilia})`;
export const dataItemSubclase = `${BASICS_WITH_DESCRIPTION}, codigoSubclase: codigosubclase, categoria: categorias (${dataItemCategoria})`;

export const dataItemEmpleado = `
${BASICS},
nombre,
apellido,
email,
telefono,
puesto: puestos (${dataItemPuesto}),
genero: generos (${dataItemGenero}),
tipoPago: tipos_pago (${dataItemTipoPago}),
alias,
salario,
inhabilitado,
observaciones
`;

export const dataItemInventario = `
${BASICS},
idProducto: id_producto,
cantidad,
tienda: tiendas (${dataItemTienda})
`;

export const dataItemPrecioProducto = `
${BASICS},
idProducto: id_producto,
precio,
tipoUnidad: tipos_unidades (${dataItemTipoUnidad})
`;

export const dataItemProducto = `
${BASICS_WITH_DESCRIPTION},
subclase: subclases (${dataItemSubclase}),
codigoProducto: codigoproducto,
marca: marcas (${dataItemMarca}),
inhabilitado,
oferta,
inventario: inventario (${dataItemInventario}),
precios: productos_precios (${dataItemPrecioProducto})
`;

export const dataItemCliente = `
${BASICS},
dni,
nombreCompleto: nombre_completo,
telefono
`;

export const dataItemDetalleFactura = `
${BASICS},
idFactura: id_factura,
producto: productos (${dataItemProducto}),
tipoUnidad: tipos_unidades (${dataItemTipoUnidad}),
cantidad,
precioUnitario: precio_unitario,
subtotal
`;

export const dataItemFactura = `
${BASICS},
cliente: clientes (${dataItemCliente}),
empleado: empleados (${dataItemEmpleado}),
formaPago: formas_pago(${dataItemFormaPago}),
total,
nula,
detalle: detalle_facturas (${dataItemDetalleFactura})
`;
