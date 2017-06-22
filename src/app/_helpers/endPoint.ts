import { Http, BaseRequestOptions, Response, ResponseOptions, RequestMethod, XHRBackend, RequestOptions } from '@angular/http';
import { MockConnection } from '@angular/http/testing';

import { UserSvc } from '../controller/userSvc';

export class EndPoint {
    private user = new UserSvc();
    process(connection: MockConnection) {
        if (connection.request.url.includes('/api/user')) {
            this.user.process(connection);
        }
    }
}