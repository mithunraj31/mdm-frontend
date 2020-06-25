export interface UserAccount {
    name: string;
    roles?: string[];
    uuid: string;
    email?: string;
    systemRoles?: string[];
    siteUuid?: string;
    imgUrl?: string;
}