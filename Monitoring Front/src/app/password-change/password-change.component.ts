import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { UserService } from '../_services/user.service';
import jwt_decode from 'jwt-decode';
import { UserAuthService } from '../_services/user-auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-password-change',
  templateUrl: './password-change.component.html',
  styleUrls: ['./password-change.component.css'],
})
export class PasswordChangeComponent implements OnInit {
  errorMessage = 'Invalid';
  successMessage: string = '';
  invalidLogin = false;
  loginSuccess = false;

  constructor(
    private userService: UserService,
    private userAuthService: UserAuthService,
    private router: Router
  ) {}

  ngOnInit(): void {
    //this.userId = this.authService.getUserId();
  }

  changePassword(changePasswordForm: NgForm) {
    console.log(this.userAuthService.getUserId());
    const userId = this.userAuthService.getUserId();
    const newPassword = changePasswordForm.value.newpassword;
    const confirmPassword = changePasswordForm.value.confirmPassword;
    if (!newPassword || newPassword === '') {
      alert('Entrez le nouveau mot de passe!');
    } else if (newPassword.length < 8) {
      alert(
        'Mot de passe invalide.Mot de passe doit être au moins 8 caractères'
      );
    } else if (confirmPassword != newPassword) {
      alert(
        'Le nouveau mot de passe et sa confirmation ne sont pas identiques!'
      );
    } else {
      this.userService.changePassword(userId, newPassword).subscribe(
        (response: any) => {
          console.log(response);
          this.router.navigate(['/login']);
          this.userAuthService.clear();
        },
        (error: any) => {
          console.log(error);
          if (
            error.status === 403 &&
            error.error.message ===
              'New password cannot be the same as the old password'
          ) {
            alert('New password cannot be the same as the old password');
          }
        }
      );
    }
  }
}
