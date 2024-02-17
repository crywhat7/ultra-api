export const BASICS = `
id,
createdAt: created_at
`;

export const dataItemPuesto = `
${BASICS},
descripcion
`;

export const dataItemGenero = dataItemPuesto;
export const dataItemTipoPago = dataItemPuesto;
export const dataItemFamilia = `${dataItemPuesto}, codigoFamilia: codigofamilia`;
export const dataItemCategoria = `${dataItemPuesto}, codigoCategoria: codigocategoria, familia: familias (${dataItemFamilia})`;
export const dataItemSubclase = `${dataItemPuesto}, codigoSubclase: codigosubclase, categoria: categorias (${dataItemCategoria})`;

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
