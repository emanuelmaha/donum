import * as RxDB from 'rxdb';

declare interface RxMemeberDocumentData {
    firstName?: string;
    lastName?: string;
    middleName?: string;
    dateOfBirthday?: string;
    address?: string;
    email?: string;
    phone?: string;
    id?: number;
    relativeId?: number[];
}

export class Member extends RxDB.RxDocument implements RxMemeberDocumentData{
    firstName?: string;
    lastName?: string;
    middleName?: string;
    dateOfBirthday?: string;
    address?: string;
    email?: string;
    phone?: string;
    id?: number;
    relativeId?: number[];

    toObject(): any {
        return {
            firstName: this.firstName,
            lastName: this.lastName,
            middleName: this.middleName,
            id: +this.id,
        }
    }
}

export class RxMemberCollection extends RxDB.RxCollection<Member> {
}
