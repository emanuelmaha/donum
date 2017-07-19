import { Component, OnInit, OnDestroy, NgZone, Output, EventEmitter } from '@angular/core';
import { RxDocument } from '../../../../../node_modules/rxdb';

import { DatabaseService } from '../../../db/services/database.service'
import { Member } from '../../../_models/index';

@Component({
    selector: 'add-member',
    templateUrl: './add-member.component.html',
    providers: [DatabaseService]
})
export class AddMemberComponent implements OnInit, OnDestroy {

    currentMember: Member;
    members: RxDocument[];
    sub;

    constructor(
        private databaseService: DatabaseService,
        private zone: NgZone
    ) {
    }

    async addMember() {
        console.log('in add members')
        const db = await this.databaseService.get();
        console.log(this.currentMember.toObject())
        console.log(db.collections.member.insert(this.currentMember.toObject()));
    }

    ngAfterContentInit() { }

    ngOnInit() {
        //auto inc member id 
        this.currentMember = new Member('Test', 'Kon', '', 0, '', null, '', null, 1, null);
    }

    ngOnDestroy() {
        this.sub.unsubscribe();
    }
}
