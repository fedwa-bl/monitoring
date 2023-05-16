import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Developpeur } from '../entities/developpeur';
import { Observable } from 'rxjs';
import { HttpParams } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class AdminService {
  private apiUrl = 'http://localhost:8080/admin';

  constructor(private httpClient: HttpClient) {}

  public getDevs() {
    const accesstoken = localStorage.getItem('accesstoken');
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        Authorization: `Bearer ${accesstoken}`, // replace token with your JWT token
        'Cache-Control': 'no-cache',
      }),
    };
    return this.httpClient.get(this.apiUrl + '/devs', httpOptions);
  }

  public createAccount(dev: Developpeur): Observable<Object> {
    const accesstoken = localStorage.getItem('accesstoken');
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        Authorization: `Bearer ${accesstoken}`, // replace token with your JWT token
      }),
    };
    return this.httpClient.post(this.apiUrl + '/dev', dev, httpOptions);
  }

  public getDevByCuid(cuid: string) {
    return this.httpClient.get(this.apiUrl + '/dev/' + cuid);
  }

  public deleteDev(id: number) {
    return this.httpClient.delete(this.apiUrl + '/dev/' + id);
  }
  public updateDev(dev: Developpeur): Observable<Object> {
    return this.httpClient.put(this.apiUrl + '/dev', dev);
  }
  public getTicketsNonAttr() {
    const accesstoken = localStorage.getItem('accesstoken');
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        Authorization: `Bearer ${accesstoken}`, // replace token with your JWT token
        'Cache-Control': 'no-cache',
      }),
    };
    return this.httpClient.get(this.apiUrl + '/bugs', httpOptions);
  }
  public getTicketsAttr() {
    return this.httpClient.get(this.apiUrl + '/affectation');
  }
  public getTicketById(id: number) {
    return this.httpClient.get(this.apiUrl + '/ticket/' + id);
  }
  public assignTicket(input: any) {
    return this.httpClient.post(this.apiUrl + '/assign', input);
  }
  public getEds() {
    return this.httpClient.get(this.apiUrl + '/eds');
  }
  public getUsername() {
    return this.httpClient.get(this.apiUrl + '/username');
  }
  public getTicketsCount(eds: string) {
    const params = new HttpParams().set('eds', eds);
    return this.httpClient.get<number>(`${this.apiUrl}/tickets/count`, {
      params,
    });
  }
  public getTicketsCountByDev(username: string) {
    const params = new HttpParams().set('username', username);
    return this.httpClient.get<number>(`${this.apiUrl}/tickets/countDev`, {
      params,
    });
  }
  public getTicketsCountBySemester(mois: number) {
    const params = new HttpParams().set('mois', mois);
    return this.httpClient.get<number>(`${this.apiUrl}/ticketSemester`, {
      params,
    });
  }
}
