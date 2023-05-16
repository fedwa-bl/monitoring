import { Component, OnInit } from '@angular/core';
import { Ticket } from '../entities/Ticket';
import { AdminService } from '../_services/admin.service';
import { UserService } from '../_services/user.service';

@Component({
  selector: 'app-tickets-assignes',
  templateUrl: './tickets-assignes.component.html',
  styleUrls: ['./tickets-assignes.component.css'],
})
export class TicketsAssignesComponent implements OnInit {
  public tickets: any;
  page = 1;
  pageSize = 5;
  key: string = '';
  constructor(
    private adminService: AdminService,
    public userService: UserService
  ) {}

  ngOnInit(): void {
    this.onGetTickets();
  }
  onGetTickets() {
    this.adminService.getTicketsAttr().subscribe(
      (data) => {
        this.tickets = data;
      },
      (err) => {
        console.log(err);
      }
    );
  }
}
