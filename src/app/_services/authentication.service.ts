import { Injectable } from '@angular/core';
import { Http, Headers, Response } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map'
import { DatabaseService } from 'app/db/services/database.service';
import { RxDonumDatabase } from 'app/db/RxDB';
import { UserPermission, User } from 'app/_models';
import { Md5 } from 'ts-md5/dist/md5';
import { Router } from '@angular/router';

@Injectable()
export class AuthenticationService {
    private db: RxDonumDatabase;

    constructor(private http: Http,
        private databaseService: DatabaseService,
        private router: Router,
    ) {
        this.getDBData();
    }

    private async getDBData() {
        this.db = await this.databaseService.get();
    }

    login(username: string, password: string) {
        this.db.user.findOne({ username: { $eq: username }, password: { $eq: Md5.hashStr(password) } }).exec().then(
            (result: User) => {
                if (result) {
                    this.setCurrentUser(result);
                    this.router.navigate(['/pages/dashboard']);
                }
            }
        )
    }

    logout() {
        localStorage.removeItem('currentUser');
    }

    async register(name: string, username: string, email: string, password: string): Promise<any> {
        let has = UserPermission.NotAccepted;

        let user = this.db.user.newDocument({
            username: username,
            password: Md5.hashStr(password),
            name: name,
            email: email,
            permission: UserPermission.NotAccepted
        });
        await user.save().then((resp) => {
            return true;
        }).catch((error) => {
            throw error;
        });
    }

    setCurrentUser(user: User) {
        localStorage.setItem('currentUser', JSON.stringify(user));
        localStorage.setItem('lastLogin', new Date().getTime().toString());
    }

    static getCurrentUser(): User {
        let user = <User>JSON.parse(localStorage.getItem('currentUser'))
        if (user) {
            return user;
        }
        return null;
    }
}