import { Component, NgZone } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { Member, Donation } from '../../../../_models';
import { DatabaseService } from '../../../../db/services/database.service';
import { RxDonumDatabase } from 'app/db/RxDB';
import { AlertService, AlertType } from '../../../../_helpers/alert/';
import {ElectronService} from 'ngx-electron';


@Component({
  selector: 'migration',
  templateUrl: './migration.html',
})
export class MigrationComponent {
  db: RxDonumDatabase;

  constructor(
    private databaseService: DatabaseService,
    private alert: AlertService,
    private _electronService: ElectronService
  ) {
    this.getDBData();
  }
  private async getDBData() {
    this.db = await this.databaseService.get();
  }
  export() {
    console.log(this._electronService);
    console.log(this._electronService.ipcRenderer.sendSync('saveExport', 'ping')) // prints "pong"
    
    // ipcRenderer.on('asynchronous-reply', (event, arg) => {
    //   console.log(arg) // prints "pong"
    // })
    // this.db.dump().then(
    //   (json) => {
        
    //   }
    // )
  }
}
