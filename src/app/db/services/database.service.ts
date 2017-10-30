import { Injectable } from '@angular/core';

import * as RxDB from '../../../../node_modules/rxdb';
import { RxDatabase, QueryChangeDetector } from '../../../../node_modules/rxdb';
import { MapDatabase } from './mapDatabase';


// always needed for replication with the node-server
RxDB.plugin(require('pouchdb-adapter-http'));

// import typings
import * as RxDBTypes from '../RxDB.d';

QueryChangeDetector.enable();
QueryChangeDetector.enableDebugging();

const adapters = {
    localstorage: require('pouchdb-adapter-localstorage'),
    websql: require('pouchdb-adapter-websql'),
    idb: require('pouchdb-adapter-idb')
};

const useAdapter = 'idb';
RxDB.plugin(adapters[useAdapter]);


console.log('hostname: ' + window.location.hostname);
const syncURL = 'http://127.0.0.1:10101/';
console.log(syncURL);

@Injectable()
export class DatabaseService {
    static dbPromise: Promise<RxDBTypes.RxDonumDatabase> = null;

    private async _create(): Promise<RxDBTypes.RxDonumDatabase> {
        localStorage.clear();        
        const db: RxDBTypes.RxDonumDatabase = <RxDBTypes.RxDonumDatabase>await RxDB.create({
            name: 'domnu',
            adapter: useAdapter,
            // password: 'myLongAndStupidPassword' // no password needed
        });
        console.log('DatabaseService: created database');
        window['db'] = db; // write to window for debugging

        // show leadership in title
        db.waitForLeadership()
            .then(() => {
                console.log('isLeader now');
                document.title = '♛ ' + document.title;
            });

        // create collections
        console.log('DatabaseService: create collections');
        let collections = MapDatabase.getCollection();
        await Promise.all(collections.map(colData => db.collection(colData)));

        // hooks
        console.log('DatabaseService: add hooks');
        db.collections.member.preInsert(function (docObj) {
            const firstName = docObj.firstName;
            const lastName = docObj.lastName;
            return db.collections.member.findOne({ firstName, lastName }).exec()
                .then(has => {
                    if (has != null) {
                        throw new Error('Already existing member ' + firstName + ' ' + lastName);
                    }
                    return db;
                });
        });
        db.collections.user.preInsert(function (docObj) {
            const username = docObj.username;
            return db.collections.user.findOne({ username }).exec()
                .then(has => {
                    if (has != null) {
                        throw new Error('Already existing user with ' + username);
                    }
                    return db;
                });
        });

        //sync
        console.log('DatabaseService: sync');
        collections
            .map(col => col.name)
            .forEach(colName => db[colName].sync({ remote: syncURL + colName + '/' }));

        return db;
    }

    get(): Promise<RxDBTypes.RxDonumDatabase> {
        if (DatabaseService.dbPromise)
            return DatabaseService.dbPromise;

        // create database
        DatabaseService.dbPromise = this._create();
        return DatabaseService.dbPromise;
    }
}
