import { RxCollection,RxDocument } from 'rxdb';

declare interface DonationDocumentData {
    id?:number;
    memberName?: string;
    dateOfReceived?: string;
    createdDate?: string;
    checkNo?: string;
    sum?: number;
    scope?: string;
}

export class Donation extends RxDocument implements DonationDocumentData {
    id: number;
    memberName: string;
    dateOfReceived: string;
    createdDate: string;
    checkNo: string;
    sum: number;
    scope:string;

    static GroupDonationByMemberName(donations: Donation[]): Donation[] {
        let result = []

        for(let donation of donations) {
            let exit = result.filter(d => d.memberName == donation.memberName);
            if(exit.length > 0){
                exit[0].sum +=donation.sum;
            } else {
                result.push(donation);
            }
        }

        return result;
    }

    static GetToatalDonation(donations: Donation[]) :number {
        let result = 0;
        for(let donation of donations) {
            result += donation.sum;
        }

        return result;
    }
}


export class RxDonationCollection extends RxCollection<Donation> {
}
