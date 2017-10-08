import { Donation, IMember } from '../_models/'

export class MemberView implements IMember  {
    firstName?: string;
    lastName?: string;
    middleName?: string;
    dateOfBirthday?: string;
    address?: string;
    email?: string;
    phone?: string;
    _id?: string;
    relativeId?: number[];
    donations: Donation | Donation[];

    fromJson(member:any){
        this.firstName = member.firstName;
        this.lastName = member.lastName;
        this.middleName = member.middleName;
        this.dateOfBirthday = member.dateOfBirthday;
        this.address = member.address;
        this.email = member.email;
        this.phone = member.phone;
        this._id = member._id;
        this.relativeId = member.relativeId;

        return this;
    }

    getFullName() {
        return this.firstName + ' ' + this.lastName;
    }
}