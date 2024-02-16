export const dataItemAlumno = `id, createdAt: created_at, nombre, apellido, telefono, email, fechaNacimiento: fecha_nacimiento, genero, carrera`;
export const dataItemMaestro = `id, createdAt: created_at, nombre, apellido, telefono, email`;
export const dataItemMatricula = `id, createdAt: created_at, nota, alumno: alumnos (${dataItemAlumno}), clase: clases (id, nombre)`;
export const dataItemClase = `id, createdAt: created_at, nombre, maestro: maestros (${dataItemMaestro}), matriculados: matricula (${dataItemMatricula})`;
