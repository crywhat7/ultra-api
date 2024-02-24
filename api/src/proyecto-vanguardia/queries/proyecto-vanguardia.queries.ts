export const BASICS = `
id,
createdAt: created_at
`;

export const BASICS_WITH_DESCRIPTION = `
${BASICS},
descripcion
`;

export const dataItemRol = `
${BASICS_WITH_DESCRIPTION},
esAdmin: es_admin
`;

export const dataItemGenero = BASICS_WITH_DESCRIPTION;
export const dataItemPrioridad = BASICS_WITH_DESCRIPTION;
export const dataItemEstado = `${BASICS_WITH_DESCRIPTION}, terminado`;

export const dataitemUsuario = `
${BASICS},
primerNombre: primer_nombre,
segundoNombre: segundo_nombre,
primerApellido: primer_apellido,
segundoApellido: segundo_apellido,
alias,
password,
fechaNacimiento: fecha_nacimiento,
avatarUrl: avatar_url,
rol: roles (${dataItemRol}),
genero: generos (${dataItemGenero})
`;
