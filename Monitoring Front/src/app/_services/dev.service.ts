import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { Ticket } from '../entities/Ticket';

@Injectable({
  providedIn: 'root',
})
export class DevService {
  private apiUrl = 'http://localhost:8080/dev';

  constructor(private httpClient: HttpClient) {}

  getAllTickets(id: number): Observable<Ticket[]> {
    const url = `${this.apiUrl}/allTickets/${id}`;
    return this.httpClient.get<Ticket[]>(url);
  }

  getEN_ATTENTETickets(id: number): Observable<Ticket[]> {
    const url = `${this.apiUrl}/EN_ATTENTETickets/${id}?status=EN_ATTENTE`;
    return this.httpClient.get<Ticket[]>(url);
  }

  getOUVERTTickets(id: number): Observable<Ticket[]> {
    const url = `${this.apiUrl}/OUVERTTickets/${id}?status=OUVERT`;
    return this.httpClient.get<Ticket[]>(url);
  }

  getRESOLUTickets(id: number): Observable<Ticket[]> {
    const url = `${this.apiUrl}/RESOLUTickets/${id}?status=RÉSOLU`;
    return this.httpClient.get<Ticket[]>(url);
  }

  getANNULETickets(id: number): Observable<Ticket[]> {
    const url = `${this.apiUrl}/ANNULETickets/${id}?status=ANNULÉ`;
    return this.httpClient.get<Ticket[]>(url);
  }

  getEN_COURSTickets(id: number): Observable<Ticket[]> {
    const url = `${this.apiUrl}/EN_COURSTickets/${id}?status=EN_COURS`;
    return this.httpClient.get<Ticket[]>(url);
  }

  public getActiveDevs() {
    return this.httpClient.get(this.apiUrl + '/activeDevs');
  }

  public getDevByName(name: string) {
    return this.httpClient.get(this.apiUrl + '/devByName/' + name);
  }

  /*ajouterCommentaire(idTick: number, comment: string): Observable<any> {
    const url = `${this.apiUrl}/commentaire/${idTick}`;
    console.log("new comment: ",comment);
    return this.httpClient.post(url, comment, { responseType: 'text' });
  }

  updateStatus(idTick: number, status: string) {
    const url = `${this.apiUrl}/updateStatus/${idTick}`;
    const body = { status };
    console.log(body);
    //const options = { headers: { 'Content-Type': 'application/json' } };
    return this.httpClient.put(url, body, { responseType: 'text' });
  }*/

  updateTicket(idTick: number, newStatus: string, comment: string) {
    const url = `${this.apiUrl}/updateTicket/${idTick}`;
    const payload = {
      status: newStatus.toString(),
      comment: comment
    };
    const options = { headers: { 'Content-Type': 'application/json' } };
    return this.httpClient.put(url, JSON.stringify(payload), options);
  }  

}
