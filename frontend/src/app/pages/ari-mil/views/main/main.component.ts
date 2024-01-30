import { Component } from '@angular/core';
import { AriMilService } from '../../services/ari-mil.service';
import { Post, Usuario } from '../../interfaces/interfaces';
import { USER_LOGGED } from '../../../../../config/config';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
})
export class MainComponent {
  posts: Post[] = [];
  newContent = '';
  loggedUser: Usuario = this.setLoggedUser();
  constructor(private ariMilSrv: AriMilService) {
    this.getPosts();
    this.setIntervalGetPosts();
    this.ariMilSrv.$updatePosts.subscribe((resp) => {
      this.getPosts();
    });
  }

  getPosts() {
    this.ariMilSrv.getPosts().subscribe((resp) => {
      this.posts = resp;
    });
  }

  setIntervalGetPosts() {
    setInterval(() => {
      this.getPosts();
    }, 10000);
  }

  logout() {
    this.ariMilSrv.logout();
  }

  newPost() {
    const loggedUser = JSON.parse(localStorage.getItem(USER_LOGGED) || '{}');
    this.ariMilSrv
      .newPost({
        content: this.newContent,
        user: loggedUser.id,
      })
      .subscribe(
        (resp) => {
          this.getPosts();
          this.newContent = '';
        },
        (err) => {
          console.log({ err });
        }
      );
  }

  setLoggedUser() {
    const loggedUser = JSON.parse(localStorage.getItem(USER_LOGGED) || '{}');
    return loggedUser;
  }
}
