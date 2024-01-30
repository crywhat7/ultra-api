import { Component, Input, OnChanges } from '@angular/core';
import { Post, Usuario } from '../../interfaces/interfaces';
import { USER_LOGGED } from '../../../../../config/config';
import { AriMilService } from '../../services/ari-mil.service';

@Component({
  selector: 'app-card-post',
  templateUrl: './card-post.component.html',
})
export class CardPostComponent implements OnChanges {
  @Input() post!: Post;
  userHasLiked = false;
  userIsOwner = false;
  constructor(private ariMilSrv: AriMilService) {
    this.setUserHasLiked();
    this.setUserIsOwner();
  }

  ngOnChanges(): void {
    this.setUserHasLiked();
    this.setUserIsOwner();
  }

  setUserHasLiked() {
    if (!this.post) return;

    const loggedUser = JSON.parse(localStorage.getItem(USER_LOGGED) || '{}');
    for (const like of this.post.likes) {
      if (like.usuario.id === loggedUser.id) {
        this.userHasLiked = true;
        return;
      }
    }
    this.userHasLiked = false;
  }

  setUserIsOwner() {
    if (!this.post) return;
    const loggedUser = JSON.parse(localStorage.getItem(USER_LOGGED) || '{}');
    if (this.post.usuario.id === loggedUser.id) {
      this.userIsOwner = true;
      return;
    }
    this.userIsOwner = false;
  }

  toggleLike() {
    const loggedUser = JSON.parse(localStorage.getItem(USER_LOGGED) || '{}');

    this.ariMilSrv.toggleLike(this.post.id, loggedUser.id).subscribe(
      (resp) => {
        this.post = resp;
        this.setUserHasLiked();
      },
      (err) => {
        console.log({ err });
      }
    );
  }

  deletePost() {
    this.ariMilSrv.deletePost(this.post.id).subscribe(
      (resp) => {
        this.ariMilSrv.setUpdatePosts(true);
      },
      (err) => {
        console.log({ err });
      }
    );
  }
}
