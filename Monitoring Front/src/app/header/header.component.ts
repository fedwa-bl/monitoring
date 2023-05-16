import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Developpeur } from '../entities/developpeur';
import { DevService } from '../_services/dev.service';
import { UserAuthService } from '../_services/user-auth.service';
import { UserService } from '../_services/user.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css'],
})
export class HeaderComponent implements OnInit {
  username = '';
  active = false;
  dev!: Developpeur;

  constructor(
    private userAuthService: UserAuthService,
    private router: Router,
    public userService: UserService,
    private devService: DevService
  ) {}

  ngOnInit(): void {
    if (this.userAuthService.isLoggedIn()) {
      this.userService.getCurrentUser().subscribe((response) => {
        this.username = response.username;
      });
    }
  }

  public isLoggedIn() {
    return this.userAuthService.isLoggedIn();
  }

  public logout() {
    this.userAuthService.clear();
    this.router.navigate(['/login']);
    this.username = '';
  }
}
