import { RxCollection, RxDocument } from 'rxdb';
declare interface IUser {
    username?: string;
    password?: string;
    name?: string;
    email?: string;
    permission?: UserPermission
}

declare class User extends RxDocument implements IUser {
    username?: string;
    password?: string;
    name?: string;
    email?: string;
    permission?: UserPermission
}

enum UserPermission {
    SuperAdmin,
    Admin,
    User,
    NotAccepted,
}

declare class RxUserCollection extends RxCollection<User> {
}

export {
    IUser as IUser,
    User as User,
    RxUserCollection as RxUserCollection,
    UserPermission as UserPermission
}