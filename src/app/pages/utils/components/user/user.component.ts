import { Component, NgZone, OnDestroy, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { User } from '../../../../_models';
import { DatabaseService } from '../../../../db/services/database.service';
import { RxDonumDatabase } from 'app/db/RxDB';
import { AlertService, AlertType } from '../../../../_helpers/alert/';
import { UserPermission } from 'app/_models/user';
import { AuthenticationService } from 'app/_services';


@Component({
    selector: 'user',
    templateUrl: './user.html',
})
export class UserComponent implements OnInit {


    users: User | User[];
    db: RxDonumDatabase;
    permissionSelect = [{ value: 1, name: 'Admin' }, { value: 2, name: 'User' }, { value: 3, name: 'Not accepted yet' }];

    constructor(private databaseService: DatabaseService,
        private alert: AlertService,
    ) {
    }

    ngOnInit(): void {
        this.getUsers();
    }

    async getUsers() {
        this.db = await this.databaseService.get();
        this.db.user.find().exec().then(users => {
            if (Array.isArray(users)) {
                this.users = users.filter(u => u.username != AuthenticationService.getCurrentUser().username && u.permission != UserPermission.SuperAdmin);
            }
        });
    }

    changePermission(user: User) {
        if (user) {
            user.save();
        }
    }

    removeUser(user: User) {
        let sub = this.alert.showAlert('Are you sure you want to delete this user?', AlertType.Warrning, true).subscribe(
            (resp) => {
                if (resp) {
                    user.remove();
                    if (Array.isArray(this.users)) {
                        this.users = this.users.filter(u => u.username != user.username);
                    }
                    sub.unsubscribe();
                }
            }
        );
    }
}