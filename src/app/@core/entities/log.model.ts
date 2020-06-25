import { UserAccount } from './UserAccount.model';
export interface LogModel {
    event: string;
    message: string;
    loggedAt: Date;
    owner: UserAccount;
}