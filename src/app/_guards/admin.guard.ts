import { Injectable } from '@angular/core';
import { Router, CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { UserPermission } from '../_models';

@Injectable()
export class AdminGuard implements CanActivate {

    constructor(private router: Router) { }

    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
        if (AdminGuard.isAdmin()) {
            return true;
        }
        this.router.navigate(['/pages']);
        return false;
    }

    static isAdmin(): boolean {
        let user = JSON.parse(sessionStorage.getItem('currentUser'));
        if (user && (user.permission == UserPermission.Admin || user.permission == UserPermission.SuperAdmin)) {
            return true;
        }
        return false;
    }
}