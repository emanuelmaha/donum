import { Http, BaseRequestOptions, Response, ResponseOptions, RequestMethod, XHRBackend, RequestOptions } from '@angular/http';
import { MockConnection } from '@angular/http/testing';
import { Service } from './service';
import { User } from '../_models/index'

export class UserSvc extends Service {
    private users: any[] = JSON.parse(localStorage.getItem('users')) || [];

    process(connection: MockConnection) {
        this.connection = connection;
        //login 
        if (connection.request.url.endsWith('/login') && connection.request.method === RequestMethod.Post) {
            this.login(JSON.parse(connection.request.getBody()));
        }

        // register user
        if (connection.request.url.endsWith('/create') && connection.request.method === RequestMethod.Post) {
            this.create(JSON.parse(connection.request.getBody()));
        }

        //get Users
        if (connection.request.url.endsWith('/getUsers') && connection.request.method === RequestMethod.Get) {
            // if (connection.request.headers.get('Authorization') === 'Bearer fake-jwt-token') {
            this.getUsers();
            // } else {
            //     this.sendError('Please login first!')
            // }
        }

        // delete user
        if (connection.request.url.match('/remove') && connection.request.method === RequestMethod.Delete) {
            // if (connection.request.headers.get('Authorization') === 'Bearer fake-jwt-token') {
            // this.delete(connection.request.params.get('id'));
            // } else {
            //     this.sendError('Please login first!')
            // }
        }
    }

    login(data: any) {
        let user = this.users.find(user => {
            return user.username === data.username && user.password === data.password;
        });

        if (user) {
            this.sendResponse(JSON.stringify(user));
        }

        this.sendError('Username or password is incorrect');
    }

    getUsers() {
        this.sendResponse(JSON.stringify(this.users));
    }

    getUser(id: number) {

        // // get user by id
        // if (connection.request.url.match(/\/api\/users\/\d+$/) ) {
        //     // check for fake auth token in header and return user if valid, this security is implemented server side in a real application
        //     if (connection.request.headers.get('Authorization') === 'Bearer fake-jwt-token') {
        //         // find user by id in users array
        //         let urlParts = connection.request.url.split('/');
        //         let id = parseInt(urlParts[urlParts.length - 1]);
        //         let matchedUsers = users.filter(user => { return user.id === id; });
        //         let user = matchedUsers.length ? matchedUsers[0] : null;

        //         // respond 200 OK with user
        //         connection.mockRespond(new Response(new ResponseOptions({ status: 200, body: user })));
        //     } else {
        //         // return 401 not authorised if token is null or invalid
        //         connection.mockRespond(new Response(new ResponseOptions({ status: 401 })));
        //     }

        //     return;
        // }
    }

    create(user: User) {

        // validation
        let duplicateUser = this.users.find(u => { return u.username === user.username; });
        if (duplicateUser) {
            return this.sendError('Username "' + user.username + '" is already taken');
        }

        // save new user
        this.users.push(user);
        localStorage.setItem('users', JSON.stringify(this.users));

        this.sendResponse('Sucess');
    }

    editUser() {

    }

    delete(id: number) {
        let user = this.users.find(user => { return user.id === id; });

        if (!user) {
            this.sendError('User with id ' + id + ' not found in system!')
        }

        localStorage.setItem('users', JSON.stringify(this.users.filter(user => { return user.id != id })));
        this.sendResponse('Sucess');
    }
}