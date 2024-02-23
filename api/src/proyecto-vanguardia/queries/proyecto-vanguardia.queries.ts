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
