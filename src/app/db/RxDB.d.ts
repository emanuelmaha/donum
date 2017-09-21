/**
 * custom typings so typescript knows about the schema-fields
 * @type {[type]}
 */

import * as RxDB from 'rxdb';
import { Observable } from 'rxjs';
import { RxMemberCollection } from '../_models/'

export class RxDonumDatabase extends RxDB.RxDatabase {
    member?: RxMemberCollection;
}

export default {
    RxDonumDatabase
};
