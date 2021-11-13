import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot,Router, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthServiceService } from '../Services/Auth/auth-service.service';
@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  constructor(private router:Router,
    public authService: AuthServiceService){

  }
  canActivate(next: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    if(this.authService.loggedIn){
      return true;
    }
    // if (localStorage.getItem('access_token')) {
    //   return true;
    // }
    this.router.navigateByUrl('/login');
    return false;
  }
  
}