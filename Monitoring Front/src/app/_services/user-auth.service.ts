import { Injectable } from '@angular/core';
import jwt_decode from 'jwt-decode';


@Injectable({
  providedIn: 'root'
})
export class UserAuthService {

  constructor() {}

  public setRoles(roles: []){
    localStorage.setItem('roles', JSON.stringify(roles));
  }

  public getRoles(): [] {
    return JSON.parse(localStorage.getItem('roles')!);
  }

  public setAccessToken(accessToken: string){
    localStorage.setItem('access-token', accessToken);
  }

  public getAccessToken(): string{
    return localStorage.getItem('access-token')!;
  }

  public clear(){
    localStorage.clear();
  }

  public isLoggedIn(){
    return this.getRoles() && this.getAccessToken();
  }

  public getUserId(): number {
    const accessToken: any = localStorage.getItem('accesstoken');
    const tokenData: any = jwt_decode(accessToken);
    return tokenData.userId;
  }
}
