import { Component, OnInit, OnDestroy, NgZone, Output, EventEmitter } from '@angular/core';
import { RxDocument } from '../../../../../node_modules/rxdb';

import { DatabaseService } from '../../../db/services/database.service'
import { Member } from '../../../_models/index';

@Component({
    templateUrl: './list-member.component.html',
    providers: [DatabaseService]
})
export class ListMemberComponent implements OnInit, OnDestroy {
    members: RxDocument[];
    sub;

    constructor(
        private databaseService: DatabaseService,
        private zone: NgZone
    ) {
    }

    private async _show() {
        const db = await this.databaseService.get();
        const members$ = db['member']
            .find()
            .$;
        this.sub = members$.subscribe(members => {
            this.members = members;
            this.zone.run(() => { });
        });
    }

    ngOnInit() {
        this._show();
    }

    ngOnDestroy() {
        this.sub.unsubscribe();
    }
}
