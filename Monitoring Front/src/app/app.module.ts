import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule, Routes } from '@angular/router';
import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';
import { FooterComponent } from './footer/footer.component';
import { ManageUsersComponent } from './manage-users/manage-users.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatTableModule } from '@angular/material/table';
import { MatPaginatorModule, MatPaginator } from '@angular/material/paginator';
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { MatDividerModule } from '@angular/material/divider';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { DataTablesModule } from 'angular-datatables';
import { CreateDevComponent } from './create-dev/create-dev.component';
import { MatCardModule } from '@angular/material/card';
import { FormsModule } from '@angular/forms';
import { UpdateDevComponent } from './update-dev/update-dev.component';
import { NgxPaginationModule } from 'ngx-pagination';
import { OrderModule } from 'ngx-order-pipe';
import { AssignTicketsComponent } from './assign-tickets/assign-tickets.component';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { TicketsAssignesComponent } from './tickets-assignes/tickets-assignes.component';
import { LoginComponent } from './login/login.component';
import { PasswordChangeComponent } from './password-change/password-change.component';
import { DeveloperComponent } from './developer/developer.component';
import { ForbiddenComponent } from './forbidden/forbidden.component';
import { AuthGuard } from './_auth/auth.guard';
import { HttpInterceptorService } from './_auth/http-interceptor.service';
import { UserService } from './_services/user.service';
import { AdminComponent } from './admin/admin.component';
import { AppRoutingModule } from './app-routing.module';
import { MatTooltipModule } from '@angular/material/tooltip';
import { UpdateTicketComponent } from './update-ticket/update-ticket.component';
import { NavbarAdminComponent } from './navbar-admin/navbar-admin.component';
import { NavbarDeveloperComponent } from './navbar-developer/navbar-developer.component';
import { TicketsOpenedDeveloperComponent } from './tickets-opened-developer/tickets-opened-developer.component';
import { TicketsResolvedDeveloperComponent } from './tickets-resolved-developer/tickets-resolved-developer.component';
import { TicketsCanceledDeveloperComponent } from './tickets-canceled-developer/tickets-canceled-developer.component';
import { DeveloperStatisticsComponent } from './developer-statistics/developer-statistics.component';
import { TicketsInProgressdDeveloperComponent } from './tickets-in-progressd-developer/tickets-in-progressd-developer.component';
import { ChartsComponent } from './charts/charts.component';
import { ReAssignComponent } from './re-assign/re-assign.component';
import { DevDetailsComponent } from './dev-details/dev-details.component';
import { MatMenuModule } from '@angular/material/menu';
const routes: Routes = [
  { path: 'assign/:id', component: AssignTicketsComponent },
  { path: 'manageUsers', component: ManageUsersComponent },
  { path: 'assignedTickets', component: TicketsAssignesComponent },
  { path: 'manageUsers/create', component: CreateDevComponent },
  { path: 'manageUsers/update/:cuid', component: UpdateDevComponent },
  { path: 'reAssign/:id', component: ReAssignComponent },
  { path: 'charts', component: ChartsComponent },
  { path: 'manageUsers/details/:cuid', component: DevDetailsComponent },
];

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    NavbarAdminComponent,
    PasswordChangeComponent,
    HeaderComponent,
    ManageUsersComponent,
    CreateDevComponent,
    UpdateDevComponent,
    AssignTicketsComponent,
    FooterComponent,
    DeveloperComponent,
    ForbiddenComponent,
    TicketsAssignesComponent,
    AdminComponent,
    UpdateTicketComponent,
    NavbarAdminComponent,
    NavbarDeveloperComponent,
    TicketsOpenedDeveloperComponent,
    TicketsResolvedDeveloperComponent,
    TicketsCanceledDeveloperComponent,
    DeveloperStatisticsComponent,
    TicketsInProgressdDeveloperComponent,
    ChartsComponent,
    ReAssignComponent,
    DevDetailsComponent,
  ],
  imports: [
    BrowserModule,
    [RouterModule.forRoot(routes)],
    BrowserModule,
    DataTablesModule,
    BrowserAnimationsModule,
    CommonModule,
    MatTableModule,
    MatPaginatorModule,
    MatButtonModule,
    MatDividerModule,
    MatFormFieldModule,
    MatInputModule,
    MatCardModule,
    MatTooltipModule,
    FormsModule,
    HttpClientModule,
    NgxPaginationModule,
    OrderModule,
    MatDatepickerModule,
    MatNativeDateModule,
    AppRoutingModule,
    MatMenuModule,
  ],
  providers: [
    AuthGuard,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: HttpInterceptorService,
      multi: true,
    },
    UserService,
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
