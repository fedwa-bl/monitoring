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
import { UpdateTicketComponent } from './update-ticket/update-ticket.component';
import { NavbarAdminComponent } from './navbar-admin/navbar-admin.component';
import { TicketsOpenedDeveloperComponent } from './tickets-opened-developer/tickets-opened-developer.component';
import { TicketsCanceledDeveloperComponent } from './tickets-canceled-developer/tickets-canceled-developer.component';
import { TicketsResolvedDeveloperComponent } from './tickets-resolved-developer/tickets-resolved-developer.component';
import { DeveloperStatisticsComponent } from './developer-statistics/developer-statistics.component';
import { TicketsInProgressdDeveloperComponent } from './tickets-in-progressd-developer/tickets-in-progressd-developer.component';

const routes: Routes = [
  { path: "", redirectTo: "/login", pathMatch: "full" },
  { path: "login", component: LoginComponent },
  { path: "admin", component: AdminComponent, canActivate:[AuthGuard], data:{roles:['ADMIN']} },
  { path: "developer", component: DeveloperComponent, canActivate:[AuthGuard], data:{roles:['DEVELOPER']} },
  { path: "passwordChange", component: PasswordChangeComponent },
  { path: "forbidden", component: ForbiddenComponent },
  { path: "createDev", component: CreateDevComponent },
  { path: "TicketsAssigne", component: AssignTicketsComponent },
  { path: 'navbar-admin', component: NavbarAdminComponent },
  { path: "updatedev", component: UpdateDevComponent },
  { path: 'assign/:id', component: AssignTicketsComponent },
  { path: 'manageUsers', component: ManageUsersComponent, canActivate:[AuthGuard], data:{roles:['ADMIN']} },
  { path: 'assignedTickets', component: TicketsAssignesComponent },
  { path: 'manageUsers/create', component: CreateDevComponent },
  { path: 'manageUsers/update/:cuid', component: UpdateDevComponent },
  { path: "updateTicket/:id", component: UpdateTicketComponent },
  { path: "ticketsOpenedDeveloper", component: TicketsOpenedDeveloperComponent },
  { path: "ticketsCanceledDeveloper", component: TicketsCanceledDeveloperComponent },
  { path: "ticketsResolvedDeveloper", component: TicketsResolvedDeveloperComponent },
  { path: "ticketsInProgressDeveloper", component: TicketsInProgressdDeveloperComponent },
  { path: "developerStatistics", component: DeveloperStatisticsComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
