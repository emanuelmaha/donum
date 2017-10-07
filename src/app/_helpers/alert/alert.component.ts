import { Component, ElementRef, OnDestroy, ViewChild, AfterViewInit, NgZone} from '@angular/core';
import { AlertService, AlertType } from './alert.service'
import { Subscription } from 'rxjs/Subscription';
@Component({
	moduleId: module.id,
	selector: 'alert',
	styleUrls: ['alert.scss'],
	templateUrl: 'alert.html',
})
export class AlertComponent implements AfterViewInit, OnDestroy {
	sub: Subscription;
	@ViewChild('openModal') openModal: ElementRef;
	@ViewChild('closeModal') closeModal: ElementRef;
	title: string;
	message: string;
	confirmationButtons = false;

	constructor(private alerService: AlertService, private zone : NgZone) {}

	ngAfterViewInit(): void {
		this.sub = this.alerService.getAlert().subscribe((resp :{message: string, type: AlertType, confirmation: boolean }) => {
			this.message = resp.message;
			this.setTitle(resp.type);
			this.confirmationButtons = resp.confirmation;
			this.zone.run(() => {});
			this.openModal.nativeElement.click();
		});
	}

	ngOnDestroy() {
		this.sub.unsubscribe();
	}

	confirm() {
		this.alerService.sendResponse(true);
		this.closeModal.nativeElement.click();
	}

	private setTitle(alertType: AlertType): any {
		switch (alertType) {
			case AlertType.Error:
				this.title = 'Error';
				break;
			case AlertType.Info:
				this.title = 'Info';
				break;
			case AlertType.Success:
				this.title = 'Success';
				break;
			case AlertType.Warrning:
				this.title = 'Warning';
				break;
		}
	}
}