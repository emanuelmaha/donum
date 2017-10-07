import {Injectable} from '@angular/core'
import { Observable } from 'rxjs/Rx';
import { Subject } from 'rxjs/Subject';

@Injectable()
export class AlertService {
	private alert = new Subject<any>();
	private response = new Subject<any>();

	showAlert(message: string, type: AlertType, confirmation = false):Observable<any> {
		console.log(message);
		this.alert.next({ message: message, type: type, confirmation: confirmation });
		return this.response.asObservable();
	}

	cleanAlert() {
		this.alert.next();
		this.response.next();
	}

	getAlert(): Observable<any> {
		return this.alert.asObservable();
	}

	sendResponse(response: boolean) {
		this.response.next(response);
	}

}

export enum AlertType {
	Error,
	Warrning,
	Info,
	Success
}