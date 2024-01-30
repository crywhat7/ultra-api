import { Injectable } from '@nestjs/common';
import { SupabaseService } from 'src/db/supabase.service';
import { SupabaseClient } from '@supabase/supabase-js';
import {
  dataItemLike,
  dataItemPais,
  dataItemPost,
  dataItemUser,
} from './queries/ari-mil-rs.queries';
import { CreatePostDTO } from './dtos/Post.dto';
import { CreateUserDTO } from './dtos/User.dto';
import { ToggleLikeDTO } from './dtos/Like.dto';

@Injectable()
export class AriMilRsService {
  supabase: SupabaseClient<any, 'public', any>;
  constructor(private readonly supabaseService: SupabaseService) {
    this.supabase = this.supabaseService.supabase;
  }

  // ! PUBLICACIONES
  async getPosts() {
    const { data: posts, error } = await this.supabase
      .schema('public')
      .from('publicaciones')
      .select(dataItemPost)
      .order('created_at', { ascending: false });

    if (error) {
      throw error;
    }
    return posts;
  }

  async getPostById(id: string) {
    const { data: post, error } = await this.supabase
      .schema('public')
      .from('publicaciones')
      .select(dataItemPost)
      .eq('id', id)
      .single();

    if (error) {
      throw error;
    }
    return post;
  }

  async getPostsByUserId(id: string) {
    const { data: posts, error } = await this.supabase
      .schema('public')
      .from('publicaciones')
      .select(dataItemPost)
      .eq('user', id)
      .order('created_at', { ascending: false });

    if (error) {
      throw error;
    }
    return posts;
  }

  async deletePost(id: string) {
    const { data: post, error } = await this.supabase
      .schema('public')
      .from('publicaciones')
      .delete()
      .eq('id', id);

    if (error) {
      throw error;
    }
    return post;
  }

  async createPost(post: CreatePostDTO) {
    const { data: newPost, error } = await this.supabase
      .schema('public')
      .from('publicaciones')
      .insert(post)
      .select(dataItemPost);

    if (error) {
      throw error;
    }
    return newPost;
  }

  async toggleLikePost(props: ToggleLikeDTO) {
    const { idPost, idUser } = props;

    const { data: like, error } = await this.supabase
      .schema('public')
      .from('likes')
      .select(dataItemLike)
      .eq('post', idPost)
      .eq('user', idUser);

    if (error) {
      throw error;
    }

    const [likeItem] = like || [];

    if (likeItem && likeItem?.id) {
      const { error: errorDeleteLike } = await this.supabase
        .schema('public')
        .from('likes')
        .delete()
        .eq('id', likeItem?.id);

      if (errorDeleteLike) {
        throw errorDeleteLike;
      }

      return this.getPostById(idPost);
    }

    const { error: errorNewLike } = await this.supabase
      .schema('public')
      .from('likes')
      .insert({ post: idPost, user: idUser })
      .select(dataItemLike);

    if (errorNewLike) {
      throw errorNewLike;
    }

    return this.getPostById(idPost);
  }

  // ! USUARIOS
  async getUsers() {
    const { data: users, error } = await this.supabase
      .schema('public')
      .from('usuarios')
      .select(dataItemUser);

    if (error) {
      throw error;
    }
    return users;
  }

  async getUserById(id: string) {
    const { data: user, error } = await this.supabase
      .schema('public')
      .from('usuarios')
      .select(dataItemUser)
      .eq('id', id)
      .single();

    if (error) {
      throw error;
    }
    return user;
  }

  async login(emailOrUsername: string, password: string) {
    // Hacer un select para buscar el usuario por email o username
    // Si existe, comparar el password
    // Si el password es correcto, devolver el usuario
    // Si el password es incorrecto, devolver un error

    const { data: user, error } = await this.supabase
      .schema('public')
      .from('usuarios')
      .select(dataItemUser)
      .or(`email.eq.${emailOrUsername},username.eq.${emailOrUsername}`)
      .single();

    if (error) {
      throw error;
    }

    if (!user) {
      throw new Error('El usuario no existe');
    }

    // Obtener la contraseñá del usuario
    const { data: userPassword, error: errorUser } = await this.supabase
      .schema('public')
      .from('usuarios')
      .select('password')
      .eq('id', user.id)
      .single();

    if (errorUser) {
      throw errorUser;
    }

    // Comparar la contraseña del usuario con la contraseña que se recibe

    if (userPassword.password !== password) {
      throw new Error('La contraseña es incorrecta');
    }

    return user;
  }

  async createUser(user: CreateUserDTO) {
    // 1. Verificar si el usuario existe
    // 2. Si no existe, crear el usuario
    // 3. Si existe, devolver el objeto del usuario y loggear

    const { email, password, username } = user;

    const { data: idUser, error } = await this.supabase
      .schema('public')
      .from('usuarios')
      .select('id')
      .or(
        `email.eq.${email.trim().toLowerCase()},username.eq.${username.trim().toLowerCase()}`,
      );

    if (error) {
      throw error;
    }

    if (idUser && idUser.length > 0) {
      return await this.login(username, password);
    }

    const { data: newUser, error: errorUser } = await this.supabase
      .schema('public')
      .from('usuarios')
      .insert(user)
      .select(dataItemUser);

    if (errorUser) {
      throw errorUser;
    }

    return newUser;
  }

  async getPaises() {
    const { data: paises, error } = await this.supabase
      .schema('public')
      .from('paises')
      .select(dataItemPais);

    if (error) {
      throw error;
    }
    return paises;
  }
}
