<<<<<<< HEAD
// Account model use for storing MDM user data
export class AccountModel {
    // the ID generated from backend API
    id?: number;
    name: string;
    email: string;
    // the password cannot receive from API, send only
    password?: string;
}
=======
export interface Account {
    email: string;
    password: string;
    eulaEnabled: boolean;
}
>>>>>>> master
