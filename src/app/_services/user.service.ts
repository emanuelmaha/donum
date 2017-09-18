import { Injectable } from '@angular/core';
import { Http, Headers, RequestOptions, Response, URLSearchParams } from '@angular/http';

import { User } from '../_models/index';

@Injectable()
export class UserService {
    constructor(private http: Http) { }

    getAll() {
        return this.http.get('/api/user/getUsers', this.jwt()).map((response: Response) => response.json());
    }

    getById(id: number) {
        let requestOpt = this.jwt({ 'id': id });
        return this.http.get('/api/user/getUser', requestOpt).map((response: Response) => response.json());
    }

    create(user: User) {
        return this.http.post('/api/user/create', user, this.jwt()).map((response: Response) => response.json());
    }

    update(user: User) {
        return this.http.put('/api/user/update' + user.id, user, this.jwt()).map((response: Response) => response.json());
    }

    delete(id: number) {
        return this.http.delete('/api/user/remove' + id, this.jwt()).map((response: Response) => response.json());
    }

    // private helper methods

    private jwt(params = null) {
        // create authorization header with jwt token
        let currentUser = JSON.parse(localStorage.getItem('currentUser'));

        if (currentUser && currentUser.token) {
            let headers = new Headers({ 'Authorization': 'Bearer ' + currentUser.token });

            return new RequestOptions({
                headers: headers
            });
        }
    }
}