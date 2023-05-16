import { Component, OnInit } from '@angular/core';
import { FormControl, NgForm } from '@angular/forms';
import { UserAuthService } from '../_services/user-auth.service';
import { UserService } from '../_services/user.service';
import jwt_decode from 'jwt-decode';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit {
  errorMessage = 'Invalid';
  successMessage: string = '';
  invalidLogin = false;
  loginSuccess = false;
  password = new FormControl('');
  showPassword = false;

  constructor(
    private userService: UserService,
    private userAuthService: UserAuthService,
    private router: Router
  ) {}

  ngOnInit(): void {}

  login(loginForm: NgForm) {
    if (!loginForm.value.username || !loginForm.value.password) {
      alert('Veuillez remplir les champs!');
    } else {
      this.userService.login(loginForm.value).subscribe(
        (response: any) => {
          localStorage.setItem('accesstoken', response.accessToken);
          //to extract roles from our access-token
          const tokenData: any = jwt_decode(response.accessToken);
          console.log(response.accessToken.username);
          //console.log(tokenData.roles);
          this.userAuthService.setRoles(tokenData.roles);
          this.userAuthService.setAccessToken(response.accessToken);

          const role = tokenData.roles[0];
          // Check if user needs to change their password
          this.userService
            .needsPasswordChange(loginForm.value.username)
            .subscribe((needsChange) => {
              if (needsChange == false) {
                this.router.navigate(['/passwordChange']);
              } else {
                if (role === 'ADMIN') {
                  this.router.navigate(['/admin']).then(() => {
                    if (this.router.url === '/admin') {
                      window.location.reload();
                    }
                  });
                } else if (role === 'DEVELOPER') {
                  this.router.navigate(['/developer']).then(() => {
                    if (this.router.url === '/developer') {
                      window.location.reload();
                    }
                  });
                }
              }
            });
        },
        (error) => {
          console.log(error);
          if (error.status === 401) {
            alert('Invalid username or password.');
            location.reload();
          } else {
            alert('An error occurred. Please try again later.');
            location.reload();
          }
        }
      );
    }
  }
  toggleShowPassword() {
    this.showPassword = !this.showPassword;
  }
  //console.log('clicked');
  //console.log(loginForm.value.username);
  //const token = localStorage.getItem('access-token')!;
  //const decodedToken = jwt_decode(token) as DecodedToken;
  //const roles = decodedToken.roles;
  //const accessToken = localStorage.getItem('access-token')!;
  //const tokenData: any = jwt_decode(accessToken);
}
