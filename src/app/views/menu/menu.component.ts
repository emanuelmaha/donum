import { Component, OnInit, OnDestroy, NgZone, Output, EventEmitter } from '@angular/core';
import { RxDocument } from '../../../../node_modules/rxdb';

import { DatabaseService } from '../../db/services/database.service'

import { User, Link } from '../../_models/index';
import { UserService } from '../../_services/index';

@Component({
    moduleId: module.id,
    selector: 'menu',
    templateUrl: 'menu.component.html'
})

export class MenuComponent implements OnInit {
    currentUser: User;
    links: Link[];

    constructor(
        private userService: UserService
    ) {
        console.log('showmenu');
        this.currentUser = JSON.parse(localStorage.getItem('currentUser'));
    }

    show(link: string) {

    }

    ngOnInit() {
        this.getMenuLinks();
    }

    getMenuLinks() {
        this.links = [
            new Link(1, "Menu", "/menu", true),
            new Link(2, "Members", "/member", false),
            new Link(3, "Donation", "/donation", false),
            new Link(4, "Contribution ", "/contribution", false)
        ]
        console.log(this.links);
    }
}
