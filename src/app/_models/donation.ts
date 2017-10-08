import { RxCollection,RxDocument } from 'rxdb';

declare interface IDonation {
    id?:number;
    memberId?:string;
    memberName?: string;
    dateOfReceived?: string;
    createdDate?: string;
    checkNo?: string;
    sum?: number;
    scope?: string;
}

declare class Donation extends RxDocument implements IDonation {
    id: number;
    memberName: string;
    memberId:string;
    dateOfReceived: string;
    createdDate: string;
    checkNo: string;
    sum: number;
    scope:string;
}

declare class RxDonationCollection extends RxCollection<Donation> {
}

export {
    IDonation as IDonation,
    Donation as Donation,
    RxDonationCollection as RxDonationCollection
}