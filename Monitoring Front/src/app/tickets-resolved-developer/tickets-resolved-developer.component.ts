import { Component } from '@angular/core';
import { DevService } from '../_services/dev.service';
import { UserService } from '../_services/user.service';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';

@Component({
  selector: 'app-tickets-resolved-developer',
  templateUrl: './tickets-resolved-developer.component.html',
  styleUrls: ['./tickets-resolved-developer.component.css'],
})
export class TicketsResolvedDeveloperComponent {
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
        this.devService.getRESOLUTickets(devId).subscribe(
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
