import { Injectable } from '@angular/core';
import { Router, CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { UserPermission } from '../_models';

@Injectable()
export class UserGuard implements CanActivate {

    constructor(private router: Router) { }

    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
        if (UserGuard.IsUser()){
             return true;
        }
        this.router.navigate(['/pages']);
        return false;
    }

    static IsUser():boolean {
        let user = JSON.parse(localStorage.getItem('currentUser'));
        if (user && (user.permission == UserPermission.User || user.permission == UserPermission.Admin || user.permission == UserPermission.SuperAdmin)) {
            return true;
        }
        return false;
    }
}