# Alert Modal

#### How to use alert modal

    - Import AlertModal and provide AlertService in your Module as example:
		
		import { AlertModule, AlertService } from '/ng/core/alert/index'
		
		@NgModule({
			imports: [
				AlertModule,
				..
			],
			providers: [ AlertService ... ],
		})

	- Add directive in your component.html 
		<alert></alert>
	
	- Import AlertService and AlertType in component.ts and initialize AlertService in constructor
		import { AlertService, AlertType } from '/ng/core/alert/index';
		
		constructor(private alertService: AlertService) {}

	- Call AlertService method showAlert to popup alert
		this.alertService.showAlert(message: string, alertType: AlertType, confiramtion: boolean)

			message: string (Message to show on alert dialog)
			alertType: AlertType - Info, Success, Error, Warrning (type of alert)
			confirmation: boolean -true, false (show Yes,No button for confirmation dialog, if Yes then you have to subscribe to receive the response)

			Example: 
				this.alertService.showAlert('Please develop better!', AlertType.Info);
				this.alertService.showAlert('Success saving new record!', AlertType.Success);
				this.alertService.showAlert('An error ocurred during save!', AlertType.Error);
				this.alertService.showAlert('Are you sure you want to delete?', AlertType.Warrning, true);
					.subscribe((resp) => {
						console.log(resp);
						if(resp) {
							this.fillData.deleteTemplate();
						}
					});