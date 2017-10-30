import { Injectable } from '@angular/core';
import { Http, Headers, RequestOptions, Response, URLSearchParams } from '@angular/http';

import { User } from '../_models/index';

@Injectable()
export class UserService {
    constructor(private http: Http) { }

    private jwt(params = null) {
        // create authorization header with jwt token
        let currentUser = JSON.parse(sessionStorage.getItem('currentUser'));

        if (currentUser && currentUser.token) {
            let headers = new Headers({ 'Authorization': 'Bearer ' + currentUser.token });

            return new RequestOptions({
                headers: headers
            });
        }
    }
}