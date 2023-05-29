import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Subject } from 'rxjs';
import { AdminService } from '../_services/admin.service';
import { OrderPipe } from 'ngx-order-pipe';
import { UserService } from '../_services/user.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-manage-users',
  templateUrl: './manage-users.component.html',
  styleUrls: ['./manage-users.component.css'],
})
export class ManageUsersComponent implements OnInit {
  public devs: any;
  dtoptions: DataTables.Settings = {};
  dtTrigger: Subject<any> = new Subject<any>();
  cuid!: string;
  page = 1;
  pageSize = 5;
  key: string = '';

  constructor(
    private adminService: AdminService,
    private router: Router,
    private orderPipe: OrderPipe,
    public userService: UserService
  ) {}
  ngOnInit(): void {
    this.dtoptions = {
      pagingType: 'full_numbers',
      searching: true,
      lengthChange: false,
    };

    this.onGetDevs();
  }

  onGetDevs() {
    this.adminService.getDevs().subscribe(
      (data) => {
        this.devs = data;
        this.dtTrigger.next(this.devs);
        this.dtTrigger.next(this.devs);
      },
      (err) => {
        console.log(err);
      }
    );
  }
  reverse: boolean = false;
  sortBy(key: string) {
    this.key = key;
    this.reverse = !this.reverse;
    const isDesc = this.reverse;
    this.devs = this.orderPipe.transform(this.devs, this.key, isDesc);
  }

  searchDev() {
    if (!this.cuid) {
      this.adminService.getDevs().subscribe((devs) => (this.devs = devs));
    } else {
      this.adminService.getDevByCuid(this.cuid).subscribe(
        (developer) => {
          if (developer) {
            this.devs = [developer];
          } else {
            alert('Le développeur avec le cuid ' + this.cuid + ' non trouvé.');
          }
        },
        (error) => {
          alert(
            'Error while searching for developer with CUID ' + this.cuid + '.'
          );
        }
      );
    }
  }

  onDelete(dev: any) {
    let conf = confirm('Etes vous sure?');
    if (conf) {
      this.adminService.deleteDev(dev.id).subscribe(
        (data) => {
          this.onGetDevs();
          Swal.fire({
            position: 'center',
            icon: 'success',
            title: 'Compte supprimé',
            showConfirmButton: false,
            timer: 1500,
          });
        },
        (err) => {
          console.log(err);
          if (err.status === 403) {
            Swal.fire({
              icon: 'error',
              title: 'Oops...',
              text: 'Ce développeur a été assigné à des tickets! ',
            });
          }
        }
      );
    }
  }
  onUpdate(cuid: number) {
    this.router.navigate(['manageUsers', 'update', cuid]);
  }
  onDetails(cuid: string) {
    this.router.navigate(['manageUsers', 'details', cuid]);
  }
}
