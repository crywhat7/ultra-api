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
export const dataItemTerminacion = `${BASICS_WITH_DESCRIPTION}, fueResolutoria: fue_resolutoria`;

export const dataitemUsuario = `
${BASICS},
primerNombre: primer_nombre,
segundoNombre: segundo_nombre,
primerApellido: primer_apellido,
segundoApellido: segundo_apellido,
alias,
fechaNacimiento: fecha_nacimiento,
avatarUrl: avatar_url,
rol: roles (${dataItemRol}),
genero: generos (${dataItemGenero})
`;

export const dataItemImage = `
${BASICS},
idTicket: id_ticket,
url,
filename
`;

export const dataItemChat = `
${BASICS},
idTicket: id_ticket,
usuario: usuarios (${dataitemUsuario}),
message,
imagen: images (${dataItemImage})
`;

export const dataItemTicket = `
${BASICS},
titulo,
descripcion,
prioridad: prioridades (${dataItemPrioridad}),
estado: estados (${dataItemEstado}),
terminacion: terminaciones (${dataItemTerminacion}),
resolvedAt: resolved_at,
messages: chat (${dataItemChat}),
postBy: usuarios!atm_tickets_postBy_fkey(${dataitemUsuario}),
assignedTo: usuarios!atm_tickets_asignedTo_fkey(${dataitemUsuario})
`;
