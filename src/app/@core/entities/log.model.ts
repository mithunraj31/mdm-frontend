export interface LogModel {
    event: string;
    message: string;
    loggedAt: Date;
    owner: Account;
}