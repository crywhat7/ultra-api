export interface APIResponse<T> {
  isSuccess: boolean;
  message: string;
  count: number;
  data: T;
}

export interface BASICS {
  id: number;
  createdAt: Date;
}

export interface BASICS_WITH_DESCRIPTION extends BASICS {
  descripcion: string;
}

export interface Rol extends BASICS_WITH_DESCRIPTION {
  esAdmin: boolean;
}

export interface Prioridad extends BASICS_WITH_DESCRIPTION {}
export interface Estado extends BASICS_WITH_DESCRIPTION {
  terminado: boolean;
}
export interface Terminacion extends BASICS_WITH_DESCRIPTION {
  fueResolutoria: boolean;
}

export interface Usuario extends BASICS {
  primerNombre: string;
  segundoNombre: string;
  primerApellido: string;
  segundoApellido: string;
  alias: string;
  fechaNacimiento: Date;
  avatarUrl: string;
  rol: Rol;
  genero: Genero;
}

export interface UsuarioCreate
  extends Omit<Usuario, 'id' | 'createdAt' | 'rol' | 'genero' | 'avatarUrl'> {
  idRol: number;
  idGenero: number;
  avatarUrlBase64: string;
  password: string;
}

export interface Genero extends BASICS_WITH_DESCRIPTION {}

export interface Rol extends BASICS_WITH_DESCRIPTION {
  esAdmin: boolean;
}

export interface Ticket {
  id: number;
  createdAt: Date;
  titulo: string;
  descripcion: string;
  resolvedAt: null;
  prioridad: Prioridad;
  estado: Estado;
  terminacion: Terminacion | null;
  messages: Message[];
  postBy: Usuario;
  assignedTo: Usuario | null;
}

export interface Message {
  id: number;
  imagen: Imagen | null;
  message: string;
  usuario: Usuario;
  idTicket: number;
  createdAt: Date;
}

export interface Imagen {
  id: number;
  url: string;
  filename: string;
  idTicket: number;
  createdAt: Date;
}

export interface CreateTicket {
  titulo: string;
  descripcion: string;
  idPrioridad: number;
  postBy: number;
  imagenBase64: string;
}

export interface CreateChat {
  message: string;
  idUsuario: number;
  idTicket: number;
  imagenBase64: string = '';
}
