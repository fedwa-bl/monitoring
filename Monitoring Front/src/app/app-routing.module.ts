import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AssignTicketsComponent } from './assign-tickets/assign-tickets.component';
import { DeveloperComponent } from './developer/developer.component';
import { ForbiddenComponent } from './forbidden/forbidden.component';
import { LoginComponent } from './login/login.component';
import { PasswordChangeComponent } from './password-change/password-change.component';
import { CreateDevComponent } from './create-dev/create-dev.component';
import { ManageUsersComponent } from './manage-users/manage-users.component';
import { TicketsAssignesComponent } from './tickets-assignes/tickets-assignes.component';
import { UpdateDevComponent } from './update-dev/update-dev.component';
import { AuthGuard } from './_auth/auth.guard';
import { AdminComponent } from './admin/admin.component';
import { NavBarComponent } from './nav-bar/nav-bar.component';

const routes: Routes = [
  { path: "", redirectTo: "/login", pathMatch: "full" },
  { path: "login", component: LoginComponent },
  { path: "admin", component: AdminComponent, canActivate:[AuthGuard], data:{roles:['ADMIN']} },
  { path: "developer", component: DeveloperComponent, canActivate:[AuthGuard], data:{roles:['DEVELOPER']} },
  { path: "passwordChange", component: PasswordChangeComponent },
  { path: "forbidden", component: ForbiddenComponent },
  { path: "createDev", component: CreateDevComponent },
  { path: "TicketsAssigne", component: AssignTicketsComponent },
  { path: 'navbar', component: NavBarComponent },
  { path: "updatedev", component: UpdateDevComponent },
  { path: 'assign/:id', component: AssignTicketsComponent },
  { path: 'manageUsers', component: ManageUsersComponent, canActivate:[AuthGuard], data:{roles:['ADMIN']} },
  { path: 'assignedTickets', component: TicketsAssignesComponent },
  { path: 'manageUsers/create', component: CreateDevComponent },
  { path: 'manageUsers/update/:cuid', component: UpdateDevComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
