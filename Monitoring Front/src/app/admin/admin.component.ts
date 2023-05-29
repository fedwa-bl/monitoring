import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AdminService } from '../_services/admin.service';
import { UserService } from '../_services/user.service';
@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css'],
})
export class AdminComponent implements OnInit {
  constructor(
    private adminService: AdminService,
    private router: Router,
    public userService: UserService
  ) {}
  public tickets: any;
  id_ticket!: number;
  page = 1;
  pageSize = 5;
  key: string = '';

  ngOnInit(): void {
    this.onGetTickets();
  }

  onGetTickets() {
    this.adminService.getTicketsNonAttr().subscribe(
      (data) => {
        this.tickets = data;
      },
      (err) => {
        console.log(err);
      }
    );
  }
  assign(id_ticket: number) {
    this.router.navigate(['/assign', id_ticket]);
    console.log('ssssssssss' + id_ticket);
  }
}
