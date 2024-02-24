import { Injectable } from '@nestjs/common';
import { SupabaseService } from 'src/db/supabase.service';
import { SupabaseClient } from '@supabase/supabase-js';
import {
  dataItemChat,
  dataItemEstado,
  dataItemGenero,
  dataItemImage,
  dataItemPrioridad,
  dataItemRol,
  dataItemTerminacion,
  dataItemTicket,
  dataitemUsuario,
} from './queries/proyecto-vanguardia.queries';
import { DB_RESPONSE } from 'src/utils/db-response';
import { BUCKETS, FOLDERS, UploadImages } from 'src/utils/upload-image';
import { CreateUsuarioDto } from './dtos/usuario.dto';
import { CreatePrioridadDto } from './dtos/prioridad.dto';
import { CreateEstadoDto } from './dtos/estado.dto';
import { CreateTerminacionDto } from './dtos/terminacion.dto';
import { CreateTicketDto } from './dtos/ticket.dto';

const ESQUEMA = 'atm';

@Injectable()
export class ProyectoVanguardiaService {
  supabase: SupabaseClient<any, 'public', any>;

  constructor(private readonly supabaseService: SupabaseService) {
    this.supabase = this.supabaseService.supabase;
  }

  LOGIN = {
    login: async (alias: string, password: string) => {
      const { data, error } = await this.supabase
        .schema(ESQUEMA)
        .from('usuarios')
        .select(dataitemUsuario)
        .eq('alias', alias)
        .eq('password', password);

      return new DB_RESPONSE<typeof data>(
        data,
        'usuarios',
        error,
        'Error al iniciar sesion',
      ).sendResponse();
    },
  };

  ROLES = {
    getRoles: async () => {
      const { data, error } = await this.supabase
        .schema(ESQUEMA)
        .from('roles')
        .select(dataItemRol)
        .order('created_at', { ascending: false });

      return new DB_RESPONSE<typeof data>(
        data,
        'roles',
        error,
        'Error al obtener roles',
      ).sendResponse();
    },

    getRolById: async (id: number) => {
      const { data, error } = await this.supabase
        .schema(ESQUEMA)
        .from('roles')
        .select(dataItemRol)
        .eq('id', id);

      return new DB_RESPONSE<typeof data>(
        data,
        'roles',
        error,
        'Error al obtener rol',
      ).sendResponse();
    },

    crearRol: async ({
      descripcion,
      esAdmin,
    }: {
      descripcion: string;
      esAdmin: boolean;
    }) => {
      const { data, error } = await this.supabase
        .schema(ESQUEMA)
        .from('roles')
        .insert({ descripcion, es_admin: esAdmin })
        .select(dataItemRol);

      return new DB_RESPONSE<typeof data>(
        data,
        'roles',
        error,
        'Error al crear rol',
      ).sendResponse();
    },
    editarRol: async ({
      id,
      descripcion,
      esAdmin,
    }: {
      id: number;
      descripcion: string;
      esAdmin: boolean;
    }) => {
      const { data, error } = await this.supabase
        .schema(ESQUEMA)
        .from('roles')
        .update({ descripcion, es_admin: esAdmin })
        .eq('id', id)
        .select(dataItemRol);

      return new DB_RESPONSE<typeof data>(
        data,
        'roles',
        error,
        'Error al editar rol',
      ).sendResponse();
    },
    deleteRol: async (id: number) => {
      const { data, error } = await this.supabase
        .schema(ESQUEMA)
        .from('roles')
        .delete()
        .eq('id', id)
        .select(dataItemRol);

      return new DB_RESPONSE<typeof data>(
        data,
        'roles',
        error,
        'Error al eliminar rol',
      ).sendResponse();
    },
  };
  USUARIOS = {
    getUsuarios: async () => {
      const { data, error } = await this.supabase
        .schema(ESQUEMA)
        .from('usuarios')
        .select(dataitemUsuario);

      return new DB_RESPONSE<typeof data>(
        data,
        'usuarios',
        error,
        'Error al obtener usuarios',
      ).sendResponse();
    },
    getUsuarioById: async (id: number) => {
      const { data, error } = await this.supabase
        .schema(ESQUEMA)
        .from('usuarios')
        .select(dataitemUsuario)
        .eq('id', id);

      return new DB_RESPONSE<typeof data>(
        data,
        'usuarios',
        error,
        'Error al obtener usuario',
      ).sendResponse();
    },
    createUsuario: async (user: CreateUsuarioDto) => {
      const {
        primerNombre,
        segundoNombre,
        primerApellido,
        segundoApellido,
        alias,
        password,
        fechaNacimiento,
        avatarUrlBase64,
        idRol,
        idGenero,
      } = user;
      const image = await this.IMAGES.uploadImage(avatarUrlBase64);

      const { data, error } = await this.supabase
        .schema(ESQUEMA)
        .from('usuarios')
        .insert({
          primer_nombre: primerNombre,
          segundo_nombre: segundoNombre,
          primer_apellido: primerApellido,
          segundo_apellido: segundoApellido,
          alias,
          password,
          fecha_nacimiento: fechaNacimiento,
          avatar_url: image.fullPath,
          id_rol: idRol,
          id_genero: idGenero,
        })
        .select(dataitemUsuario)
        .single();

      return new DB_RESPONSE<typeof data>(
        data,
        'usuarios',
        error,
        'Error al crear usuario',
      ).sendResponse();
    },
    updateUsuario: async (user: CreateUsuarioDto & { id: number }) => {
      const {
        id,
        primerNombre,
        segundoNombre,
        primerApellido,
        segundoApellido,
        alias,
        password,
        fechaNacimiento,
        avatarUrlBase64,
        idRol,
        idGenero,
      } = user;
      const image = await this.IMAGES.uploadImage(avatarUrlBase64);

      const { data, error } = await this.supabase
        .schema(ESQUEMA)
        .from('usuarios')
        .update({
          primer_nombre: primerNombre,
          segundo_nombre: segundoNombre,
          primer_apellido: primerApellido,
          segundo_apellido: segundoApellido,
          alias,
          password,
          fecha_nacimiento: fechaNacimiento,
          avatar_url: image.fullPath,
          id_rol: idRol,
          id_genero: idGenero,
        })
        .eq('id', id)
        .select(dataitemUsuario)
        .single();

      return new DB_RESPONSE<typeof data>(
        data,
        'usuarios',
        error,
        'Error al actualizar usuario',
      ).sendResponse();
    },
    deleteUsuario: async (id: number) => {
      const { data, error } = await this.supabase
        .schema(ESQUEMA)
        .from('usuarios')
        .delete()
        .eq('id', id)
        .select(dataitemUsuario);

      return new DB_RESPONSE<typeof data>(
        data,
        'usuarios',
        error,
        'Error al eliminar usuario',
      ).sendResponse();
    },
  };
  GENEROS = {
    getGeneros: async () => {
      const { data, error } = await this.supabase
        .schema(ESQUEMA)
        .from('generos')
        .select(dataItemGenero);

      return new DB_RESPONSE<typeof data>(
        data,
        'generos',
        error,
        'Error al obtener generos',
      ).sendResponse();
    },
    getGeneroById: async (id: number) => {
      const { data, error } = await this.supabase
        .schema(ESQUEMA)
        .from('generos')
        .select(dataItemGenero)
        .eq('id', id);

      return new DB_RESPONSE<typeof data>(
        data,
        'generos',
        error,
        'Error al obtener genero',
      ).sendResponse();
    },
    crearGenero: async ({ descripcion }: { descripcion: string }) => {
      const { data, error } = await this.supabase
        .schema(ESQUEMA)
        .from('generos')
        .insert({ descripcion })
        .select(dataItemGenero);

      return new DB_RESPONSE<typeof data>(
        data,
        'generos',
        error,
        'Error al crear genero',
      ).sendResponse();
    },
    editarGenero: async ({
      id,
      descripcion,
    }: {
      id: number;
      descripcion: string;
    }) => {
      const { data, error } = await this.supabase
        .schema(ESQUEMA)
        .from('generos')
        .update({ descripcion })
        .eq('id', id)
        .select(dataItemGenero);

      return new DB_RESPONSE<typeof data>(
        data,
        'generos',
        error,
        'Error al editar genero',
      ).sendResponse();
    },
    deleteGenero: async (id: number) => {
      const { data, error } = await this.supabase
        .schema(ESQUEMA)
        .from('generos')
        .delete()
        .eq('id', id)
        .select(dataItemGenero);

      return new DB_RESPONSE<typeof data>(
        data,
        'generos',
        error,
        'Error al eliminar genero',
      ).sendResponse();
    },
  };
  IMAGES = {
    uploadImage: async (base64: string) => {
      const uploadImageUtil = new UploadImages(this.supabase);
      return await uploadImageUtil.uploadImageBase64({
        base64,
        bucket: BUCKETS.ATM,
        folder: FOLDERS.TICKETS,
      });
    },
  };

  PRIORIDADES = {
    getPrioridades: async () => {
      const { data, error } = await this.supabase
        .schema(ESQUEMA)
        .from('prioridades')
        .select(dataItemPrioridad)
        .order('id', { ascending: true });

      return new DB_RESPONSE<typeof data>(
        data,
        'prioridades',
        error,
        'Error al obtener prioridades',
      ).sendResponse();
    },
    getPrioridadById: async (id: number) => {
      const { data, error } = await this.supabase
        .schema(ESQUEMA)
        .from('prioridades')
        .select(dataItemPrioridad)
        .eq('id', id);

      return new DB_RESPONSE<typeof data>(
        data,
        'prioridades',
        error,
        'Error al obtener prioridad',
      ).sendResponse();
    },
    crearPrioridad: async ({ descripcion }: CreatePrioridadDto) => {
      const { data, error } = await this.supabase
        .schema(ESQUEMA)
        .from('prioridades')
        .insert({ descripcion })
        .select(dataItemPrioridad);

      return new DB_RESPONSE<typeof data>(
        data,
        'prioridades',
        error,
        'Error al crear prioridad',
      ).sendResponse();
    },
    editarPrioridad: async ({
      id,
      descripcion,
    }: CreatePrioridadDto & { id: number }) => {
      const { data, error } = await this.supabase
        .schema(ESQUEMA)
        .from('prioridades')
        .update({ descripcion })
        .eq('id', id)
        .select(dataItemPrioridad);

      return new DB_RESPONSE<typeof data>(
        data,
        'prioridades',
        error,
        'Error al editar prioridad',
      ).sendResponse();
    },
    deletePrioridad: async (id: number) => {
      const { data, error } = await this.supabase
        .schema(ESQUEMA)
        .from('prioridades')
        .delete()
        .eq('id', id)
        .select(dataItemPrioridad);

      return new DB_RESPONSE<typeof data>(
        data,
        'prioridades',
        error,
        'Error al eliminar prioridad',
      ).sendResponse();
    },
  };

  ESTADOS = {
    getEstados: async () => {
      const { data, error } = await this.supabase
        .schema(ESQUEMA)
        .from('estados')
        .select(dataItemEstado)
        .order('id', { ascending: true });

      return new DB_RESPONSE<typeof data>(
        data,
        'estados',
        error,
        'Error al obtener estados',
      ).sendResponse();
    },
    getEstadoById: async (id: number) => {
      const { data, error } = await this.supabase
        .schema(ESQUEMA)
        .from('estados')
        .select(dataItemEstado)
        .eq('id', id);

      return new DB_RESPONSE<typeof data>(
        data,
        'estados',
        error,
        'Error al obtener estado',
      ).sendResponse();
    },
    crearEstado: async ({ descripcion, terminado }: CreateEstadoDto) => {
      const { data, error } = await this.supabase
        .schema(ESQUEMA)
        .from('estados')
        .insert({ descripcion, terminado })
        .select(dataItemEstado);

      return new DB_RESPONSE<typeof data>(
        data,
        'estados',
        error,
        'Error al crear estado',
      ).sendResponse();
    },
    editarEstado: async ({
      id,
      descripcion,
      terminado,
    }: CreateEstadoDto & { id: number }) => {
      const { data, error } = await this.supabase
        .schema(ESQUEMA)
        .from('estados')
        .update({ descripcion, terminado })
        .eq('id', id)
        .select(dataItemEstado);

      return new DB_RESPONSE<typeof data>(
        data,
        'estados',
        error,
        'Error al editar estado',
      ).sendResponse();
    },
    deleteEstado: async (id: number) => {
      const { data, error } = await this.supabase
        .schema(ESQUEMA)
        .from('estados')
        .delete()
        .eq('id', id)
        .select(dataItemPrioridad);

      return new DB_RESPONSE<typeof data>(
        data,
        'estados',
        error,
        'Error al eliminar estado',
      ).sendResponse();
    },
  };
  TERMINACIONES = {
    getTerminaciones: async () => {
      const { data, error } = await this.supabase
        .schema(ESQUEMA)
        .from('terminaciones')
        .select(dataItemTerminacion)
        .order('id', { ascending: true });

      return new DB_RESPONSE<typeof data>(
        data,
        'terminaciones',
        error,
        'Error al obtener terminaciones',
      ).sendResponse();
    },
    getTerminacionById: async (id: number) => {
      const { data, error } = await this.supabase
        .schema(ESQUEMA)
        .from('terminaciones')
        .select(dataItemTerminacion)
        .eq('id', id);

      return new DB_RESPONSE<typeof data>(
        data,
        'terminaciones',
        error,
        'Error al obtener terminacion',
      ).sendResponse();
    },
    crearTerminacion: async ({
      descripcion,
      fueResolutoria,
    }: CreateTerminacionDto) => {
      const { data, error } = await this.supabase
        .schema(ESQUEMA)
        .from('terminaciones')
        .insert({ descripcion, fue_resolutoria: fueResolutoria })
        .select(dataItemTerminacion);

      return new DB_RESPONSE<typeof data>(
        data,
        'terminaciones',
        error,
        'Error al crear terminacion',
      ).sendResponse();
    },
    editarTerminacion: async ({
      id,
      descripcion,
      fueResolutoria,
    }: CreateTerminacionDto & { id: number }) => {
      const { data, error } = await this.supabase
        .schema(ESQUEMA)
        .from('terminaciones')
        .update({ descripcion, fue_resolutoria: fueResolutoria })
        .eq('id', id)
        .select(dataItemTerminacion);

      return new DB_RESPONSE<typeof data>(
        data,
        'terminaciones',
        error,
        'Error al editar terminacion',
      ).sendResponse();
    },
    deleteTerminacion: async (id: number) => {
      const { data, error } = await this.supabase
        .schema(ESQUEMA)
        .from('terminaciones')
        .delete()
        .eq('id', id)
        .select(dataItemTerminacion);

      return new DB_RESPONSE<typeof data>(
        data,
        'terminaciones',
        error,
        'Error al eliminar terminacion',
      ).sendResponse();
    },
  };
  TICKETS = {
    getTickets: async () => {
      const { data, error } = await this.supabase
        .schema(ESQUEMA)
        .from('tickets')
        .select(dataItemTicket);

      return new DB_RESPONSE<typeof data>(
        data,
        'tickets',
        error,
        'Error al obtener tickets',
      ).sendResponse();
    },
    getTicketById: async (id: number) => {
      const { data, error } = await this.supabase
        .schema(ESQUEMA)
        .from('tickets')
        .select(dataItemTicket)
        .eq('id', id);

      return new DB_RESPONSE<typeof data>(
        data,
        'tickets',
        error,
        'Error al obtener ticket',
      ).sendResponse();
    },
    deleteTicket: async (id: number) => {
      const { data, error } = await this.supabase
        .schema(ESQUEMA)
        .from('tickets')
        .delete()
        .eq('id', id)
        .select(dataItemTicket);

      return new DB_RESPONSE<typeof data>(
        data,
        'tickets',
        error,
        'Error al eliminar ticket',
      ).sendResponse();
    },
    createTicket: async (ticket: CreateTicketDto) => {
      const { titulo, descripcion, idPrioridad, postBy, imagenBase64 } = ticket;

      // ! Crear el Ticket
      const { data: nuevoTicket, error } = await this.supabase
        .schema(ESQUEMA)
        .from('tickets')
        .insert({
          titulo,
          descripcion,
          id_priority: idPrioridad,
          post_by: postBy,
        })
        .select(dataItemTicket)
        .single();

      if (error) {
        return new DB_RESPONSE<typeof nuevoTicket>(
          nuevoTicket,
          'tickets',
          error,
          'Error al crear ticket',
        ).sendResponse();
      }

      const { id: idNuevoTicket } = nuevoTicket;

      // ! Isertar un mensaje en el chat por parte del bot, indicando que se ha creado el ticket y con su respectiva imagen
      const ID_USER_BOT = 1;
      await this.CHAT.insertChatMessage(
        idNuevoTicket,
        ID_USER_BOT,
        `Ticket incializado: #${idNuevoTicket}`,
        imagenBase64,
      );

      return await this.TICKETS.getTicketById(idNuevoTicket);
    },
    updateStatusTicket: async (id: number, idEstado: number) => {
      const { data, error } = await this.supabase
        .schema(ESQUEMA)
        .from('tickets')
        .update({ id_status: idEstado })
        .eq('id', id)
        .select(dataItemTicket)
        .single();

      return new DB_RESPONSE<typeof data>(
        data,
        'tickets',
        error,
        'Error al actualizar estado de ticket',
      ).sendResponse();
    },
    updateTerminacionTicket: async (id: number, idTerminacion: number) => {
      const { data, error } = await this.supabase
        .schema(ESQUEMA)
        .from('tickets')
        .update({ id_terminacion: idTerminacion })
        .eq('id', id)
        .select(dataItemTicket)
        .single();

      return new DB_RESPONSE<typeof data>(
        data,
        'tickets',
        error,
        'Error al actualizar terminacion de ticket',
      ).sendResponse();
    },
  };
  CHAT = {
    insertChatMessage: async (
      ticketId: number,
      userId: number,
      message: string,
      imageBase64?: string,
    ) => {
      let idImage: number | null = null;
      if (imageBase64) {
        // ! Subir la Imagen
        const image = await this.IMAGES.uploadImage(imageBase64);
        const { fullPath, id: filename } = image;

        // ! Insertar la imagen en la tabla de imagenes
        const {
          data: nuevaImagen,
          isSuccess: successImage,
          message,
        } = await this.TICKETS_IMAGES.insertTicketImage(
          ticketId,
          fullPath,
          filename,
        );
        if (!successImage) {
          this.TICKETS.deleteTicket(ticketId);
          return new DB_RESPONSE<typeof nuevaImagen>(
            nuevaImagen,
            'images',
            null,
            message,
          ).sendResponse();
        }

        idImage = nuevaImagen.id;
      }
      const { data, error } = await this.supabase
        .schema(ESQUEMA)
        .from('chat')
        .insert({
          id_ticket: ticketId,
          id_usuario: userId,
          message,
          id_image: idImage,
        })
        .select(dataItemChat)
        .single();

      return new DB_RESPONSE<typeof data>(
        data,
        'chat',
        error,
        'Error al insertar mensaje en chat',
      ).sendResponse();
    },
  };

  TICKETS_IMAGES = {
    insertTicketImage: async (
      ticketId: number,
      url: string,
      filename: string,
    ) => {
      const { data, error } = await this.supabase
        .schema(ESQUEMA)
        .from('images')
        .insert({ id_ticket: ticketId, url, filename })
        .select(dataItemImage)
        .single();

      console.log({
        data,
        error,
      });

      return new DB_RESPONSE<typeof data>(
        data,
        'tickets_images',
        error,
        'Error al insertar imagen de ticket',
      ).sendResponse();
    },
  };
}
