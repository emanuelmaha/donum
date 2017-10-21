import { Component, NgZone } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { Member, Donation } from '../../../../_models';
import { DatabaseService } from '../../../../db/services/database.service';
import { RxDonumDatabase } from 'app/db/RxDB';
import { AlertService, AlertType } from '../../../../_helpers/alert/';
import { ElectronService } from 'ngx-electron';


@Component({
  selector: 'migration',
  templateUrl: './migration.html',
})
export class MigrationComponent {
  db: RxDonumDatabase;
  fileImport: any;

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
    this.db.dump().then(
      (json) => {
        this._electronService.ipcRenderer.sendSync('exportDatabase', JSON.stringify(json));
      }
    );
  }

  import(file) {
    if (file && file[0] && file[0].path) {
      if (1 == 1) {
        console.log(file[0]);
        let jsonFile = this._electronService.ipcRenderer.sendSync('importDatabase', file[0].name);
        if (jsonFile) {
          this.db.remove().then(
            () => {
              console.log(jsonFile);
              this.db.importDump(jsonFile).then(() => {
                console.log("Import done!")
              });
            }
          )
        }
      } else {
        this.alert.showAlert('Please insert just json file', AlertType.Warrning);
      }
    }
  }
}
