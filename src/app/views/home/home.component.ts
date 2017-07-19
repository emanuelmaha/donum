import { Component, OnInit, OnDestroy, NgZone, Output, EventEmitter } from '@angular/core';
import { RxDocument } from '../../../../node_modules/rxdb';

import { DatabaseService } from '../../db/services/database.service'

import { User } from '../../_models/index';
import { UserService } from '../../_services/index';

@Component({
    moduleId: module.id,
    templateUrl: 'home.component.html'
})

export class HomeComponent implements OnInit, OnDestroy{
    currentUser: User;
    users: RxDocument[];
    sub;

    constructor(
        private databaseService: DatabaseService,
        private zone: NgZone,
        private userService: UserService
        ) {
        console.log('inHome');
        this.currentUser = JSON.parse(localStorage.getItem('currentUser'));
    }

   private async _show() {
        const db = await this.databaseService.get();
        const usersDb = db['user']
            .find()
            .$;
        this.sub = usersDb.subscribe(users => {
            this.users = users;
            this.zone.run(() => { });
        });
    }

    ngOnInit() {
        this._show();
    }

    deleteUser(id: number) {
        this.userService.delete(id).subscribe(() => { this.loadAllUsers() });
    }

    private loadAllUsers() {
        this.userService.getAll().subscribe(users => { this.users = users; });
    }
    
    ngOnDestroy() {
        this.sub.unsubscribe();
    }
}
