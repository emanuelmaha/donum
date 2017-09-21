import { Injectable } from '@angular/core';

import * as RxDB from '../../../../node_modules/rxdb';
import { RxDatabase, QueryChangeDetector } from '../../../../node_modules/rxdb';
import { MapDatabase } from './mapDatabase';

// batteries-included
// import RxDB from 'rxdb';

/**
 * custom build
 */

// import modules



// always needed for replication with the node-server
RxDB.plugin(require('pouchdb-adapter-http'));


// import typings
import * as RxDBTypes from '../RxDB.d';

QueryChangeDetector.enable();
QueryChangeDetector.enableDebugging();


// RxDB.plugin(require('pouchdb-adapter-idb'));
// RxDB.plugin(require('pouchdb-replication'));
// RxDB.plugin(require('pouchdb-adapter-http'));

const adapters = {
    localstorage: require('pouchdb-adapter-localstorage'),
    websql: require('pouchdb-adapter-websql'),
    idb: require('pouchdb-adapter-idb')
};

const useAdapter = 'idb';
RxDB.plugin(adapters[useAdapter]);


let collections = [
    {
        name: 'member',
        schema: require('../schemas/member.schema.json'),
        methods: {
            hpPercent() {
                return this.hp / this.maxHP * 100;
            }
        },
        sync: true
    }
];
console.log('hostname: ' + window.location.hostname);
const syncURL = 'http://' + window.location.hostname + ':10101/';
console.log(syncURL);
let doSync = true;
if (window.location.hash == '#nosync') doSync = false;

@Injectable()
export class DatabaseService {
    static dbPromise: Promise<RxDBTypes.RxDonumDatabase> = null;
    
    private async _create(): Promise<RxDatabase> {
        const db: RxDBTypes.RxDonumDatabase = await RxDB.create({
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
        await Promise.all(collections.map(colData => db.collection(colData)));

        // hooks
        console.log('DatabaseService: add hooks');
        db.collections.member.preInsert(function(docObj) {
            const firstName = docObj.firstName;
            const lastName = docObj.lastName;
            return db.collections.member.findOne({ firstName,lastName  }).exec()
                .then(has => {
                    if (has != null) {
                        alert('Already existing member ' + firstName + ' ' + lastName);
                        throw new Error('color already there');
                    }
                    return db;
                });
        });

        // sync
        console.log('DatabaseService: sync');
        collections
            .filter(col => col.sync)
            .map(col => col.name)
            .forEach(colName => db[colName].sync({ remote: syncURL + colName + '/' }));


        // console.log('DatabaseService: creating database..');
        // const db = await RxDB.create({ name: 'donum', adapter: 'idb', password: 'HGF3@Da45De' });
        // console.log('DatabaseService: created database');
        // window['db'] = db; // write to window for debugging
        // // show leadership in title
        // db.waitForLeadership()
        //     .then(() => {
        //         console.log('isLeader now');
        //         document.title = '♛ ' + document.title;
        //     });
        // let collections = MapDatabase.getCollection();
        // // create collections
        // console.log('DatabaseService: create collections');
        // const col = await Promise.all(collections.map(colData => db.collection(colData)));
        
        // console.log('hostname: ' + window.location.hostname);
        // const syncURL = 'http://' + window.location.hostname + ':10101/';

        // console.log('DatabaseService: sync');
        // col.forEach( colection => colection.sync('http://localhost:5984/donum/'))



        // const colUser =  await db.collection({
        //     name: 'user',
        //     schema: require('../schemas/user.schema.json'),
        // });
        // const syncURL = 'http://' + window.location.hostname + ':10102/';
        
        // colUser.sync('http://localhost:5984/donum/')
        
        // hooks
        // console.log('DatabaseService: add hooks');
        // db.collections.user.preInsert(function(docObj) {
            //     let username = docObj.username;
            //     return db.collections.user.findOne({ username }).exec()
            //         .then(has => {
                //             if (has != null) {
                    //                 alert('Please choose another username!');
                    //                 throw new Error('Username already taken!');
                    //             }
                    //             return db;
                    //         });
                    // });
                    
                    // sync
                    
                    // console.log(colUser)
        // console.log(collections)
        // console.log(db);
        // collections
        //     .filter(col => col.sync)
        //     .map(col => col.name)
        //     .forEach(colName => db[colName].sync({ remote: 'http://localhost:5984/donum/' + colName + '/' }));
        // //db.collections.filter(col => col.sync());
            //
            //.map(col => col.name);
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
