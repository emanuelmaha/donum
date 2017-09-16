
export class Donation {
    id: number;
    memberId: number;
    dateOfReceived: string;
    checkNo: string;
    sum: number;

    constructor(
        id: number,
        memberId: number,
        dateOfReceived: string,
        checkNo: string,
        sum: number
    ) {
        this.id = id;
        this.memberId = memberId;
        this.dateOfReceived = dateOfReceived;
        this.checkNo = checkNo;
        this.sum = sum;
    }
}
