import { Component } from '@angular/core';
import { Account } from '../../../@core/entities/account.model'
 
@Component({
    selector: 'mdm-login',
    templateUrl: './login.component.html'
})
export class LoginComponent {

    user: Account;
    submitted: boolean = false;

    constructor() {
        this.user = <Account>{};
    }

    login() {
        console.log(this.user);
    }
}