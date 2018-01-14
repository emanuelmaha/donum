import { Donation, IMember, Member } from '../_models/'

export class MemberView implements IMember  {
    firstName?: string;
    lastName?: string;
    middleName?: string;
    dateOfBirthday?: string;
    address?: string;
    email?: string;
    phoneNumber?: string;
    _id?: string;
    relativeId?: number[];
    donations: Donation | Donation[];

    static fromJson(member:Member | any) : MemberView {
        let memberView = new MemberView();
        memberView.firstName = member.firstName;
        memberView.lastName = member.lastName;
        memberView.middleName = member.middleName;
        memberView.dateOfBirthday = member.dateOfBirthday;
        memberView.address = member.address;
        memberView.email = member.email;
        memberView.phoneNumber = member.phoneNumber;
        memberView._id = member._id;
        memberView.relativeId = member.relativeId;

        return memberView;
    }

    getFullName() {
        return this.firstName + ' ' + this.lastName;
    }
}