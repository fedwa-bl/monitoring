import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ApplicationService {

  private apiUrl = 'http://localhost:8080/app';

  constructor(private httpClient: HttpClient) { }

  getAllApps(): Observable<string[]> {
    return this.httpClient.get<string[]>(this.apiUrl + "/getAllApps" );
  }

}
