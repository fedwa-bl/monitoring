import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { UserAuthService } from './user-auth.service';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  PATH_OF_API = 'http://localhost:8080';
  private csrfToken = 'YOUR_CSRF_TOKEN_HERE'; // replace with your actual CSRF token
  constructor(
    private httpclient: HttpClient,
    private userAuthService: UserAuthService
  ) {}

  public login(loginData: any) {
    console.log(loginData);
    // set the headers
    const headers = new HttpHeaders({
      'Content-Type': 'application/x-www-form-urlencoded',
      'X-XSRF-TOKEN': this.csrfToken,
    });
    // encode the credentials using urlencode
    const encodedCredentials = new URLSearchParams();
    encodedCredentials.set('username', loginData.username);
    encodedCredentials.set('password', loginData.password);

    return this.httpclient.post(
      this.PATH_OF_API + '/login',
      encodedCredentials.toString(),
      { headers }
    );
  }

  public roleMatch(allowedRoles: Array<string>): boolean {
    let isMatch = false;
    const userRoles: Array<string> = this.userAuthService.getRoles();
    //console.log(userRoles);
    if (userRoles != null && userRoles) {
      for (let i = 0; i < userRoles.length; i++) {
        for (let j = 0; j < allowedRoles.length; j++) {
          if (userRoles[i] === allowedRoles[j]) {
            isMatch = true;
            return isMatch;
          } else {
            return isMatch;
          }
        }
      }
    }
    return false;
  }

  public needsPasswordChange(username: string): Observable<boolean> {
    const accesstoken = localStorage.getItem('accesstoken');
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        Authorization: `Bearer ${accesstoken}`, // replace token with your JWT token
        'Cache-Control': 'no-cache',
      }),
    };
    return this.httpclient.get<boolean>(
      this.PATH_OF_API + `/api/users/${username}/forcePasswordChange`,
      httpOptions
    );
  }

  public changePassword(id: number, newPassword: string): Observable<any> {
    const accesstoken = localStorage.getItem('accesstoken');
    const body = { password: newPassword };
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        Authorization: `Bearer ${accesstoken}`, // replace token with your JWT token
      }),
    };
    //const body = { id, newPassword };
    return this.httpclient.post(
      this.PATH_OF_API + `/api/users/${id}/changePassword`,
      body,
      httpOptions
    );
  }
  getCurrentUser(): Observable<any> {
    return this.httpclient.get(this.PATH_OF_API + `/api/profile`);
  }
}
