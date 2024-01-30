export interface Usuario {
  id: string;
  fullname: string;
  username: string;
  email: string;
  country: Country;
}

export interface Country {
  id: string;
  country: string;
  rgbColor: string;
}

export interface Post {
  id: string;
  createdAt: Date;
  content: string;
  usuario: Usuario;
  likes: Like[];
}

export interface Like {
  id: string;
  post: PostClass;
  usuario: Usuario;
  createdAt: Date;
}

export interface PostClass {
  id: string;
}
