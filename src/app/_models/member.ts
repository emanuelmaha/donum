export class Member {
    firstName: string;
    lastName: string;
    middleName: string;
    dateOfBirthday: string;
    address: string;
    email: string;
    phone: string;
    id: number;
    relativeId: number[];

    constructor(
        firstName: string,
        lastName: string,
        middleName: string,
        dateOfBirthday: string,
        address: string,
        email: string,
        phone: string,
        id: number,
        relativeId: number[]
    ) {
        this.firstName = firstName;
        this.lastName = lastName;
        this.middleName = middleName;
        this.dateOfBirthday = dateOfBirthday;
        this.address = address;
        this.email = email;
        this.phone = phone;
        this.id = id;
        this.relativeId = relativeId;
    }

    toObject(): any {
        return {
            firstName: this.firstName,
            lastName: this.lastName,
            middleName: this.middleName,
            id: +this.id,
        }
    }
}