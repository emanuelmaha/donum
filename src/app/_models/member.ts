import { RxCollection, RxDocument } from 'rxdb';

declare interface IMember {
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

declare class Member extends RxDocument implements IMember {
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

declare class RxMemberCollection extends RxCollection<Member> {
}

export {
    IMember as IMember,
    Member as Member,
    RxMemberCollection as RxMemberCollection
}