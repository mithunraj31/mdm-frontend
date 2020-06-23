import { UserAccount } from './../../../@core/entities/UserAccount.model';
import { Component } from '@angular/core';
import { Account } from '../../../@core/entities/account.model'
import { LoginUser } from '../../../@core/entities/LoginUser';
import { AuthService } from '../../../auth/Auth.service';
import { Router } from '@angular/router';
import { UserService } from '../../../services/user.service';

@Component({
    selector: 'mdm-login',
    templateUrl: './login.component.html'
})
export class LoginComponent {

    user: LoginUser;
    submitted: boolean = false;

    constructor(private authService: AuthService,
        private router: Router,
        private userService: UserService) {
        this.user = <LoginUser>{};
    }

    login() {
        this.authService.login(this.user).subscribe(result => {

            // console.log(result.headers.keys());
            if (result.code == 410) { // Invalid Email
                console.log("Email invalid!");
            } else if (result.code == 411) { // Invalid Password
                console.log("Password invalid!");
            } else if (result.data.accessToken) { //Authenticated
                this.authService.setSession({ token: result.data.accessToken })
                this.userService.getUserFromApi(this.user.email).subscribe(result => {
                    let user: UserAccount = {
                        email: result.data.email,
                        name: result.data.profile.name,
                        roles: result.data.roles,
                        siteUuid: result.data.siteUuid,
                        systemRoles: result.data.systemRoles,
                        uuid: result.data.uuid,
                        imgUrl: 'https://midmtest.mic.com.tw/profile/user/'+result.data.uuid
                    }
                    localStorage.setItem('user', JSON.stringify(user));
                    this.router.navigate(['/']);
                })
            } else { // Somthing went wrong (Server error, request error)

            }

        })
        // console.log(this.user);
    }
}