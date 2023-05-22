import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Developpeur } from '../entities/developpeur';
import { AdminService } from '../_services/admin.service';
import { UserService } from '../_services/user.service';

@Component({
  selector: 'app-dev-details',
  templateUrl: './dev-details.component.html',
  styleUrls: ['./dev-details.component.css'],
})
export class DevDetailsComponent implements OnInit {
  dev!: Developpeur;
  constructor(
    private adminService: AdminService,
    public userService: UserService,
    private route: ActivatedRoute
  ) {}
  ngOnInit(): void {
    const cuid = this.route.snapshot.paramMap.get('cuid');
    this.onGetDevd(cuid!);
  }
  onGetDevd(cuid: string) {
    this.adminService.getDevByCuid(cuid!).subscribe(
      (data) => {
        this.dev = data as Developpeur;
      },
      (err) => {
        console.log(err);
      }
    );
  }
}
