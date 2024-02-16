import { Injectable } from '@nestjs/common';
import { SupabaseService } from 'src/db/supabase.service';
import { SupabaseClient } from '@supabase/supabase-js';
import {
  dataItemAlumno,
  dataItemClase,
  dataItemMaestro,
  dataItemMatricula,
} from './queries/ari-mil-rs.queries';

@Injectable()
export class Examen1Service {
  supabase: SupabaseClient<any, 'public', any>;
  constructor(private readonly supabaseService: SupabaseService) {
    this.supabase = this.supabaseService.supabase;
  }

  // ! Alumnos
  async getAlumnos() {
    const { data: alumnos, error } = await this.supabase
      .schema('public')
      .from('alumnos')
      .select(dataItemAlumno)
      .order('created_at', { ascending: false });

    if (error) {
      throw error;
    }

    return alumnos;
  }

  async getAlumnoById(id: string) {
    const { data: alumno, error } = await this.supabase
      .schema('public')
      .from('alumnos')
      .select(dataItemAlumno)
      .eq('id', id)
      .single();

    if (error) {
      throw error;
    }

    return alumno;
  }

  // ! Maestros
  async getMaestros() {
    const { data: maestros, error } = await this.supabase
      .schema('public')
      .from('maestros')
      .select(dataItemMaestro);

    if (error) {
      throw error;
    }

    return maestros;
  }

  async getMaestroById(id: string) {
    const { data: maestro, error } = await this.supabase
      .schema('public')
      .from('maestros')
      .select(dataItemMaestro)
      .eq('id', id)
      .single();

    if (error) {
      throw error;
    }

    return maestro;
  }

  // ! Clases
  async getClases() {
    const { data: clases, error } = await this.supabase
      .schema('public')
      .from('clases')
      .select(dataItemClase)
      .order('created_at', { ascending: false });

    if (error) {
      throw error;
    }

    return clases;
  }

  async getClaseById(id: string) {
    const { data: clase, error } = await this.supabase
      .schema('public')
      .from('clases')
      .select(dataItemClase)
      .eq('id', id)
      .single();

    if (error) {
      throw error;
    }

    return clase;
  }

  async asignarMaestroAClase(idMaestro: string, idClase: string) {
    const { data: clase, error } = await this.supabase
      .schema('public')
      .from('clases')
      .update({ id_maestro: idMaestro })
      .eq('id', idClase)
      .select(dataItemClase)
      .single();

    if (error) {
      throw error;
    }

    return clase;
  }

  async desasignarMaestroAClase(idClase: string) {
    const { data: clase, error } = await this.supabase
      .schema('public')
      .from('clases')
      .update({ id_maestro: null })
      .eq('id', idClase)
      .select(dataItemClase)
      .single();

    if (error) {
      throw error;
    }

    return clase;
  }

  // ! Matricula

  async getMatriculas() {
    const { data: matriculas, error } = await this.supabase
      .schema('public')
      .from('matricula')
      .select(dataItemMatricula);

    if (error) {
      throw error;
    }

    return matriculas;
  }

  async getMatriculaById(id: string) {
    const { data: matricula, error } = await this.supabase
      .schema('public')
      .from('matricula')
      .select(dataItemMatricula)
      .eq('id', id)
      .single();

    if (error) {
      throw error;
    }

    return matricula;
  }

  async matricular(idAlumno: string, idClase: string) {
    // Si ya está matriculado, no hacer nada más que devolver la matrícula
    const { data: revisarMatricula } = await this.supabase
      .schema('public')
      .from('matricula')
      .select(dataItemMatricula)
      .eq('id_alumno', idAlumno)
      .eq('id_clase', idClase)
      .single();

    if (revisarMatricula) {
      return revisarMatricula;
    }

    // Si no está matriculado, matricularlo
    const { data: matriculado, error } = await this.supabase
      .schema('public')
      .from('matricula')
      .insert({ id_alumno: idAlumno, id_clase: idClase })
      .select(dataItemMatricula)
      .single();

    if (error) {
      throw error;
    }

    return matriculado;
  }

  async desmatricular(idMatricula: string) {
    const { data, error } = await this.supabase
      .schema('public')
      .from('matricula')
      .delete()
      .eq('id', idMatricula);

    if (error) {
      throw error;
    }

    return true;
  }

  async actualizarNota(idMatricula: string, nota: number) {
    const { data: matricula, error } = await this.supabase
      .schema('public')
      .from('matricula')
      .update({ nota })
      .eq('id', idMatricula)
      .select(dataItemMatricula)
      .single();

    if (error) {
      throw error;
    }

    return matricula;
  }

  // ! PUBLICACIONES
  // async getPosts() {
  //   const { data: posts, error } = await this.supabase
  //     .schema('public')
  //     .from('publicaciones')
  //     .select(dataItemPost)
  //     .order('created_at', { ascending: false });

  //   if (error) {
  //     throw error;
  //   }
  //   return posts;
  // }

  // async getPostById(id: string) {
  //   const { data: post, error } = await this.supabase
  //     .schema('public')
  //     .from('publicaciones')
  //     .select(dataItemPost)
  //     .eq('id', id)
  //     .single();

  //   if (error) {
  //     throw error;
  //   }
  //   return post;
  // }

  // async getPostsByUserId(id: string) {
  //   const { data: posts, error } = await this.supabase
  //     .schema('public')
  //     .from('publicaciones')
  //     .select(dataItemPost)
  //     .eq('user', id)
  //     .order('created_at', { ascending: false });

  //   if (error) {
  //     throw error;
  //   }
  //   return posts;
  // }

  // async deletePost(id: string) {
  //   const { data: post, error } = await this.supabase
  //     .schema('public')
  //     .from('publicaciones')
  //     .delete()
  //     .eq('id', id);

  //   if (error) {
  //     throw error;
  //   }
  //   return post;
  // }

  // async createPost(post: CreatePostDTO) {
  //   const { data: newPost, error } = await this.supabase
  //     .schema('public')
  //     .from('publicaciones')
  //     .insert(post)
  //     .select(dataItemPost);

  //   if (error) {
  //     throw error;
  //   }
  //   return newPost;
  // }

  // async toggleLikePost(props: ToggleLikeDTO) {
  //   const { idPost, idUser } = props;

  //   const { data: like, error } = await this.supabase
  //     .schema('public')
  //     .from('likes')
  //     .select(dataItemLike)
  //     .eq('post', idPost)
  //     .eq('user', idUser);

  //   if (error) {
  //     throw error;
  //   }

  //   const [likeItem] = like || [];

  //   if (likeItem && likeItem?.id) {
  //     const { error: errorDeleteLike } = await this.supabase
  //       .schema('public')
  //       .from('likes')
  //       .delete()
  //       .eq('id', likeItem?.id);

  //     if (errorDeleteLike) {
  //       throw errorDeleteLike;
  //     }

  //     return this.getPostById(idPost);
  //   }

  //   const { error: errorNewLike } = await this.supabase
  //     .schema('public')
  //     .from('likes')
  //     .insert({ post: idPost, user: idUser })
  //     .select(dataItemLike);

  //   if (errorNewLike) {
  //     throw errorNewLike;
  //   }

  //   return this.getPostById(idPost);
  // }

  // // ! USUARIOS
  // async getUsers() {
  //   const { data: users, error } = await this.supabase
  //     .schema('public')
  //     .from('usuarios')
  //     .select(dataItemUser);

  //   if (error) {
  //     throw error;
  //   }
  //   return users;
  // }

  // async getUserById(id: string) {
  //   const { data: user, error } = await this.supabase
  //     .schema('public')
  //     .from('usuarios')
  //     .select(dataItemUser)
  //     .eq('id', id)
  //     .single();

  //   if (error) {
  //     throw error;
  //   }
  //   return user;
  // }

  // async login(emailOrUsername: string, password: string) {
  //   // Hacer un select para buscar el usuario por email o username
  //   // Si existe, comparar el password
  //   // Si el password es correcto, devolver el usuario
  //   // Si el password es incorrecto, devolver un error

  //   const { data: user, error } = await this.supabase
  //     .schema('public')
  //     .from('usuarios')
  //     .select(dataItemUser)
  //     .or(`email.eq.${emailOrUsername},username.eq.${emailOrUsername}`)
  //     .single();

  //   if (error) {
  //     throw error;
  //   }

  //   if (!user) {
  //     throw new Error('El usuario no existe');
  //   }

  //   // Obtener la contraseñá del usuario
  //   const { data: userPassword, error: errorUser } = await this.supabase
  //     .schema('public')
  //     .from('usuarios')
  //     .select('password')
  //     .eq('id', user.id)
  //     .single();

  //   if (errorUser) {
  //     throw errorUser;
  //   }

  //   // Comparar la contraseña del usuario con la contraseña que se recibe

  //   if (userPassword.password !== password) {
  //     throw new Error('La contraseña es incorrecta');
  //   }

  //   return user;
  // }

  // async createUser(user: CreateUserDTO) {
  //   // 1. Verificar si el usuario existe
  //   // 2. Si no existe, crear el usuario
  //   // 3. Si existe, devolver el objeto del usuario y loggear

  //   const { email, password, username } = user;

  //   const { data: idUser, error } = await this.supabase
  //     .schema('public')
  //     .from('usuarios')
  //     .select('id')
  //     .or(
  //       `email.eq.${email.trim().toLowerCase()},username.eq.${username.trim().toLowerCase()}`,
  //     );

  //   if (error) {
  //     throw error;
  //   }

  //   if (idUser && idUser.length > 0) {
  //     return await this.login(username, password);
  //   }

  //   const { data: newUser, error: errorUser } = await this.supabase
  //     .schema('public')
  //     .from('usuarios')
  //     .insert(user)
  //     .select(dataItemUser);

  //   if (errorUser) {
  //     throw errorUser;
  //   }

  //   return newUser;
  // }

  // async getPaises() {
  //   const { data: paises, error } = await this.supabase
  //     .schema('public')
  //     .from('paises')
  //     .select(dataItemPais);

  //   if (error) {
  //     throw error;
  //   }
  //   return paises;
  // }
}
