import { Injectable } from '@angular/core';
import { USER_LOGGED, WEB_SERVICE } from '../../../../config/config';
import { HttpClient } from '@angular/common/http';
import { Country, Post, Usuario } from '../interfaces/interfaces';
import { BehaviorSubject, catchError, map } from 'rxjs';
import { Router } from '@angular/router';

const URL_BASE = `${WEB_SERVICE}/arimil`;

@Injectable({
  providedIn: 'root',
})
export class AriMilService {
  private updatePosts = new BehaviorSubject<boolean>(false);
  $updatePosts = this.updatePosts.asObservable();

  setUpdatePosts(value: boolean) {
    this.updatePosts.next(value);
  }

  constructor(private http: HttpClient, private router: Router) {}

  login({
    userNameOrEmail,
    password,
  }: {
    userNameOrEmail: string;
    password: string;
  }) {
    const ruta = `${URL_BASE}/users/login/${userNameOrEmail}/${password}`;
    return this.http.get<Usuario>(ruta).pipe(
      map(
        (resp: Usuario) => {
          localStorage.setItem(USER_LOGGED, JSON.stringify(resp));
          this.router.navigate(['/']);
          return resp;
        },
        catchError((err) => {
          alert(err.error.message);
          throw err;
        })
      )
    );
  }

  logout() {
    localStorage.clear();
    this.router.navigate(['/login']);
  }

  getPosts() {
    const ruta = `${URL_BASE}/posts`;
    return this.http.get<Post[]>(ruta).pipe(
      map((resp: Post[]) => {
        return resp;
      }),
      catchError((err) => {
        alert(err.error.message);
        throw err;
      })
    );
  }

  toggleLike(postId: string, userId: string) {
    const ruta = `${URL_BASE}/users/like`;
    return this.http.post<Post>(ruta, { idPost: postId, idUser: userId }).pipe(
      map((resp: Post) => {
        return resp;
      }),
      catchError((err) => {
        alert(err.error.message);
        throw err;
      })
    );
  }

  newPost({ content, user }: { content: string; user: string }) {
    const ruta = `${URL_BASE}/posts`;
    return this.http.post<Post>(ruta, { content, user }).pipe(
      map((resp: Post) => {
        return resp;
      }),
      catchError((err) => {
        alert(err.error.message);
        throw err;
      })
    );
  }

  getPaises() {
    const ruta = `${URL_BASE}/paises`;
    return this.http.get<Country[]>(ruta).pipe(
      map((resp: Country[]) => {
        return resp;
      }),
      catchError((err) => {
        alert(err.error.message);
        throw err;
      })
    );
  }

  register(props: {
    fullname: string;
    username: string;
    email: string;
    password: string;
    country: string;
  }) {
    const ruta = `${URL_BASE}/users`;
    return this.http.post<Usuario>(ruta, props).pipe(
      map(
        (resp: Usuario) => {
          localStorage.setItem(USER_LOGGED, JSON.stringify(resp));
          this.router.navigate(['/']);
          return resp;
        },
        catchError((err) => {
          alert(err.error.message);
          throw err;
        })
      )
    );
  }

  deletePost(postId: string) {
    const ruta = `${URL_BASE}/posts/${postId}`;
    return this.http.delete<Post>(ruta).pipe(
      map((resp: Post) => {
        return resp;
      }),
      catchError((err) => {
        alert(err.error.message);
        throw err;
      })
    );
  }
}
