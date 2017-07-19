export class Member {
    firstName: string;
    lastName: string;
    middleName: string;
    age: number;
    dateOfBirthday: string;
    address: number;
    email: string;
    phoneNumber: number;
    id: number;
    relativeId: number[];

    constructor(
        firstName: string,
        lastName: string,
        middleName: string,
        age: number,
        dateOfBirthday: string,
        address: number,
        email: string,
        phoneNumber: number,
        id: number,
        relativeId: number[]
    ) {
        this.firstName = firstName;
        this.lastName = lastName;
        this.middleName = middleName;
        this.age = age;
        this.dateOfBirthday = dateOfBirthday;
        this.address = address;
        this.email = email;
        this.phoneNumber = phoneNumber;
        this.id = id;
        this.relativeId = relativeId;
    }

    toObject():any {
        return {
            firstName: this.firstName,
            lastName: this.lastName,
            middleName: this.middleName,
            id: +this.id
        }
    }
}