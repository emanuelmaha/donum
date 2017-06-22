import { Http, BaseRequestOptions, Response, ResponseOptions, RequestMethod, XHRBackend, RequestOptions } from '@angular/http';
import { MockBackend, MockConnection } from '@angular/http/testing';
import { EndPoint } from './endPoint'

export function backendFactory(backend: MockBackend, options: BaseRequestOptions, realBackend: XHRBackend) {
    let endPoint = new EndPoint();
    // configure fake backend
    backend.connections.subscribe((connection: MockConnection) => {
        return endPoint.process(connection);




        // // pass through any requests not handled above
        // let realHttp = new Http(realBackend, options);
        // let requestOptions = new RequestOptions({
        //     method: connection.request.method,
        //     headers: connection.request.headers,
        //     body: connection.request.getBody(),
        //     url: connection.request.url,
        //     withCredentials: connection.request.withCredentials,
        //     responseType: connection.request.responseType
        // });
        // realHttp.request(connection.request.url, requestOptions)
        //     .subscribe((response: Response) => {
        //         connection.mockRespond(response);
        //     },
        //     (error: any) => {
        //         connection.mockError(error);
        //     });
    });

    return new Http(backend, options);
};

export let BackendProvider = {
    // use fake backend in place of Http service for backend-less development
    provide: Http,
    useFactory: backendFactory,
    deps: [MockBackend, BaseRequestOptions, XHRBackend]
};