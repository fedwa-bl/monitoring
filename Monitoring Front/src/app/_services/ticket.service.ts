import { ElementRef, Injectable } from '@angular/core';
import { HttpClient, HttpParams, HttpHeaders } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class TicketService {

  private apiUrl = 'http://localhost:8080/ticket';

  constructor(private httpClient: HttpClient) {}

  getStatuses() {
    const accesstoken = localStorage.getItem('accesstoken');
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        Authorization: `Bearer ${accesstoken}`, // replace token with your JWT token
        'Cache-Control': 'no-cache',
      }),
    };
    return this.httpClient.get<string[]>(this.apiUrl + "/getStatus" );
  }

  getTicketById(id: number) {
    const accesstoken = localStorage.getItem('accesstoken');
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        Authorization: `Bearer ${accesstoken}`, // replace token with your JWT token
        'Cache-Control': 'no-cache',
      }),
    };
    return this.httpClient.get(this.apiUrl+'/getTicket/'+id);
  }

  /*getStatusCounts() {
    this.httpClient.get(this.apiUrl+'/status/developer').subscribe((data: any) => {
      const parsedData = JSON.parse(JSON.stringify(data));
      console.log("DATA SERVICE :" +parsedData);
    });
  }*/

  /*getStatusCounts() {
    this.httpClient.get(this.apiUrl + '/status/developer').subscribe(
      (response: any) => {
        console.log(response); // log the response to check if it's valid JSON
        const parsedData = JSON.parse(JSON.stringify(response));
        // rest of the code
      },
      (error) => {
        console.log(error);
      }
    );
  }*/
  

  getStatusCounts(appName: string): Observable<any> {
    const accesstoken = localStorage.getItem('accesstoken');
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        Authorization: `Bearer ${accesstoken}`, // replace token with your JWT token
        'Cache-Control': 'no-cache',
      }),
    };
    let params = new HttpParams();
    if (appName) {
      params = params.set('appName', appName);
    }
    return this.httpClient.get(this.apiUrl + '/status/developer', { params });
    //return this.httpClient.get(this.apiUrl + '/status/developer');
  }

  getStatusByApplicationCounts(appName: string): Observable<any> {
    const accesstoken = localStorage.getItem('accesstoken');
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        Authorization: `Bearer ${accesstoken}`, // replace token with your JWT token
        'Cache-Control': 'no-cache',
      }),
    };
    let params = new HttpParams();
    if (appName) {
      params = params.set('appName', appName);
    }
    return this.httpClient.get(this.apiUrl + '/status/application/developer', { params });
    //return this.httpClient.get(this.apiUrl + '/status/developer');
  }

  getCriticiteCounts(appName: string): Observable<any> {
    const accesstoken = localStorage.getItem('accesstoken');
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        Authorization: `Bearer ${accesstoken}`, // replace token with your JWT token
        'Cache-Control': 'no-cache',
      }),
    };
    let params = new HttpParams();
    if (appName) {
      params = params.set('appName', appName);
    }
    return this.httpClient.get(this.apiUrl + '/criticite/developer', { params });
    //return this.httpClient.get(this.apiUrl + '/status/developer');
  }

  getCriticiteByApplicationCounts(appName: string): Observable<any> {
    const accesstoken = localStorage.getItem('accesstoken');
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        Authorization: `Bearer ${accesstoken}`, // replace token with your JWT token
        'Cache-Control': 'no-cache',
      }),
    };
    let params = new HttpParams();
    if (appName) {
      params = params.set('appName', appName);
    }
    return this.httpClient.get(this.apiUrl + '/criticite/application/developer', { params });
    //return this.httpClient.get(this.apiUrl + '/status/developer');
  }

}
