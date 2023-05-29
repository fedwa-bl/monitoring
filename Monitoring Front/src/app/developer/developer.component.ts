import { Component } from '@angular/core';
import { DevService } from '../_services/dev.service';
import { UserService } from '../_services/user.service';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { Ticket } from '../entities/Ticket';

@Component({
  selector: 'app-developer',
  templateUrl: './developer.component.html',
  styleUrls: ['./developer.component.css'],
})
export class DeveloperComponent {
  private apiUrl = 'http://localhost:8080/api';

  constructor(
    private httpclient: HttpClient,
    private router: Router,
    public devService: DevService,
    public userService: UserService
  ) {}
  page = 1;
  pageSize = 5;
  public tickets: any;

  ngOnInit(): void {
    this.httpclient.get<any>(this.apiUrl + '/profile').subscribe(
      (user) => {
        const devId = user.id;
        this.devService.getOUVERTTickets(devId).subscribe(
          (data) => {
            this.tickets = data;
            console.log(data);
          },
          (error) => {
            console.log(error);
          }
        );
      },
      (error) => {
        console.log(error);
      }
    );
  }

  modifierTicket(id_ticket: number) {
    this.router.navigate(['/updateTicket', id_ticket]);
  }
}
