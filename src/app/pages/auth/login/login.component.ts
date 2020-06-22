
import { Component } from '@angular/core';
import { Account } from '../../../@core/entities/account.model'
import { LoginUser } from '../../../@core/entities/LoginUser';
import { AuthService } from '../../../auth/Auth.service';
import { Router } from '@angular/router';

@Component({
    selector: 'mdm-login',
    templateUrl: './login.component.html'
})
export class LoginComponent {

    user: LoginUser;
    submitted: boolean = false;

    constructor(private authService: AuthService, private router: Router) {
        this.user = <LoginUser>{};
    }

    login() {
        this.authService.login(this.user).subscribe(result => {
            console.log(result);
            if (result.code == 410) { // Invalid Email
                console.log("Email invalid!");
            } else if (result.code == 411) { // Invalid Password
                console.log("Password invalid!");
            } else if (result.data.accessToken) { //Authenticated
                this.authService.setSession({ token: result.data.accessToken })
                this.router.navigate(['/']);
            } else { // Somthing went wrong (Server error, request error)

            }

        })
        // console.log(this.user);
    }
}