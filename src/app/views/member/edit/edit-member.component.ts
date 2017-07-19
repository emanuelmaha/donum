import { Component, OnInit, OnDestroy, NgZone, Output, EventEmitter } from '@angular/core';
import { RxDocument } from '../../../../../node_modules/rxdb';

import { DatabaseService } from '../../../db/services/database.service'
import { Member } from '../../../_models/index';

@Component({
    selector: 'edi-member',
    templateUrl: './edit-member.component.html',
    providers: [DatabaseService]
})
export class EditMemberComponent implements OnInit {

    currentMember: Member;

    constructor(
        private databaseService: DatabaseService,
        private zone: NgZone
    ) {
    }

    @Output('edit') editChange: EventEmitter<RxDocument> = new EventEmitter();
    set edit(member) {
        console.log('editmember: ' + member.name);
        this.editChange.emit(member);
    }
    editMember(member) {
        this.edit = member;
    }

    ngAfterContentInit() { }
    
    ngOnInit() {}
}
