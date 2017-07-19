import { Injectable } from '@angular/core';

import * as RxDB from '../../../../node_modules/rxdb';
import { RxDatabase, QueryChangeDetector } from '../../../../node_modules/rxdb';
import { MapDatabase } from './mapDatabase';

QueryChangeDetector.enable();
QueryChangeDetector.enableDebugging();

const adapters = {
    localstorage: require('pouchdb-adapter-localstorage'),
    websql: require('pouchdb-adapter-websql'),
    idb: require('pouchdb-adapter-idb')
};

const useAdapter = 'idb';
RxDB.plugin(adapters[useAdapter]);


RxDB.plugin(require('pouchdb-adapter-http'));
RxDB.plugin(require('pouchdb-replication'));

@Injectable()
export class DatabaseService {
    static dbPromise: Promise<RxDatabase> = null;
    private async _create(): Promise<RxDatabase> {
        console.log('DatabaseService: creating database..');
        const db = await RxDB.create({ name: 'donumv1', adapter: useAdapter, password: 'HGF3@Da45De' });
        console.log('DatabaseService: created database');
        window['db'] = db; // write to window for debugging
        // show leadership in title
        db.waitForLeadership()
            .then(() => {
                console.log('isLeader now');
                document.title = '♛ ' + document.title;
            });
        let collections = MapDatabase.getCollection();
        // create collections
        console.log('DatabaseService: create collections');
        await Promise.all(collections.map(colData => db.collection(colData)));

        // hooks
        console.log('DatabaseService: add hooks');
        db.collections.user.preInsert(function(docObj) {
            let username = docObj.username;
            return db.collections.user.findOne({ username }).exec()
                .then(has => {
                    if (has != null) {
                        alert('Please choose another username!');
                        throw new Error('Username already taken!');
                    }
                    return db;
                });
        });

        // sync
        console.log('DatabaseService: sync');
        collections
            .filter(col => col.sync)
            .map(col => col.name);
        return db;
    }

    get(): Promise<RxDatabase> {
        if (DatabaseService.dbPromise)
            return DatabaseService.dbPromise;

        // create database
        DatabaseService.dbPromise = this._create();
        return DatabaseService.dbPromise;
    }
}
