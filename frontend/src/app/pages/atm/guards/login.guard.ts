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
import { USER_LOGGED_ATM } from '../../../../config/config';
import { AtmService } from '../services/atm.service';

@Injectable({
  providedIn: 'root',
})
export class LoginGuard {
  constructor(private router: Router, private atmService: AtmService) {}

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
    const userLogged = this.atmService.SESSION_STORAGE.getUser();

    if (!userLogged?.id) {
      this.router.navigate(['atm/login']);
      return false;
    }

    return true;
  }
}
