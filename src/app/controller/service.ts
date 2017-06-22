import { Http, BaseRequestOptions, Response, ResponseOptions, RequestMethod, XHRBackend, RequestOptions } from '@angular/http';
import { MockConnection } from '@angular/http/testing';

export class Service {
    protected connection: MockConnection;

    protected sendResponse(json: string) {
        this.connection.mockRespond(
            new Response(
                new ResponseOptions({
                    status: 200,
                    body: json
                })
            )
        );
    }

    protected sendError(msg: string) {
        this.connection.mockError(new Error(msg));
    }


}