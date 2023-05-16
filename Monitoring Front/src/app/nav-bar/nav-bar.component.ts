import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from '../_services/user.service';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
@Component({
  selector: 'app-nav-bar',
  templateUrl: './nav-bar.component.html',
  styleUrls: ['./nav-bar.component.css'],
})
export class NavBarComponent {
  isSidebarOpen = false;
  constructor(
    private router: Router,
    public userService: UserService,
    private breakpointObserver: BreakpointObserver
  ) {}

  isActive(url: string): boolean {
    return this.router.isActive(url, true);
  }
  toggleSidebar() {
    this.isSidebarOpen = !this.isSidebarOpen;
  }
}
