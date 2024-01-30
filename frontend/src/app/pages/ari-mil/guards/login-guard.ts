import { Injectable } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  Route,
  Router,
  RouterStateSnapshot,
  UrlSegment,
  UrlTree,
} from '@angular/router';
import { Observable } from 'rxjs';
import { USER_LOGGED } from '../../../../config/config';

@Injectable({
  providedIn: 'root',
})
export class SessionGuard {
  constructor(private router: Router) {}

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ):
    | Observable<boolean | UrlTree>
    | Promise<boolean | UrlTree>
    | boolean
    | UrlTree {
    return this.verificarSession();
  }
  canLoad(
    route: Route,
    segments: UrlSegment[]
  ):
    | Observable<boolean | UrlTree>
    | Promise<boolean | UrlTree>
    | boolean
    | UrlTree {
    return this.verificarSession();
  }

  verificarSession() {
    const userLogged = JSON.parse(localStorage.getItem(USER_LOGGED) ?? '{}');

    if (!userLogged.id) {
      this.router.navigate(['/login']);
      return false;
    }

    return true;
  }
}
