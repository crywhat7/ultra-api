export const dataItemPais = `id, country, rgbColor: rgb_color`;
export const dataItemUser = `id, fullname, username, email, country: paises (${dataItemPais})`;
export const dataItemLike = `id, createdAt: created_at, usuario: usuarios (${dataItemUser}), post: publicaciones(id)`;
export const dataItemPost = `id, createdAt: created_at, content, usuario: usuarios (${dataItemUser}), likes: likes (${dataItemLike})`;
