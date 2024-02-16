export enum Genero {
  Femenino = 'Femenino',
  Masculino = 'Masculino',
}

export interface Alumno {
  id: number;
  createdAt: Date;
  nombre: string;
  apellido: string;
  telefono: string;
  email: string;
  fechaNacimiento: Date;
  genero: Genero;
  carrera: string;
}

export interface Maestro {
  id: number;
  createdAt: Date;
  nombre: string;
  apellido: string;
  telefono: string;
  email: string;
}

export interface Matricula {
  id: number;
  createdAt: Date;
  nota: number;
  alumno: Alumno;
  clase: Clase;
}

export interface Clase {
  id: number;
  createdAt: Date;
  nombre: string;
  maestro: Maestro | null;
  matriculados: Matricula[];
}
