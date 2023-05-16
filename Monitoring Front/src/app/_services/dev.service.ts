import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class DevService {
  private apiUrl = 'http://localhost:8080/dev';

  constructor(private httpClient: HttpClient) {}

  public getActiveDevs() {
    return this.httpClient.get(this.apiUrl + '/activeDevs');
  }
  public getDevByName(name: string) {
    return this.httpClient.get(this.apiUrl + '/devByName/' + name);
  }
}
