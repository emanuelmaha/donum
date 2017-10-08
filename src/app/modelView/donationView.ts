import { IDonation } from '../_models/'
export class DonationView {

    static GroupDonationByMemberName(donations: IDonation[]): IDonation[] {
        let result = []

        for (let donation of donations) {
            let exist = result.filter(d => d.memberName == donation.memberName);
            if (exist.length > 0) {
                exist[0].sum = exist[0].sum + donation.sum;
            } else {
                result.push(donation);
            }
        }

        return result;
    }

    static GetToatalDonation(donations: IDonation[]): number {
        let result = 0;
        for (let donation of donations) {
            result += donation.sum;
        }

        return result;
    }
}