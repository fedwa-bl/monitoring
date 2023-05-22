import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Ticket } from '../entities/Ticket';
import { AdminService } from '../_services/admin.service';
import { UserService } from '../_services/user.service';
import { DevService } from '../_services/dev.service';
import { Developpeur } from '../entities/developpeur';

@Component({
  selector: 'app-re-assign',
  templateUrl: './re-assign.component.html',
  styleUrls: ['./re-assign.component.css'],
})
export class ReAssignComponent implements OnInit {
  ticket!: Ticket;
  devs!: any;
  input: any;
  response: any;
  selectedDevMatr = '';
  dev!: Developpeur;
  durationInMillis: any;
  durationInDays: any;

  constructor(
    private route: ActivatedRoute,
    private adminService: AdminService,
    public userService: UserService,
    private devService: DevService,
    private router: Router
  ) {}
  ngOnInit(): void {
    const id = Number(this.route.snapshot.paramMap.get('id'));
    this.onGetActiveDevs(id);
    this.onGetId(id);
  }
  onGetActiveDevs(id: number) {
    this.adminService.getActiveUsernames(id).subscribe(
      (data) => {
        this.devs = data as Developpeur;
        console.log('<<<<<<<<', this.devs);
      },
      (err) => {
        console.log(err);
      }
    );
  }
  onGetId(id: number) {
    this.adminService.getTicketById(id).subscribe(
      (data) => {
        this.ticket = data as Ticket;
        this.durationInMillis =
          new Date(this.ticket.date_fin).getTime() -
          new Date(this.ticket.date_creation).getTime();
        this.durationInDays = Math.floor(
          this.durationInMillis / (1000 * 60 * 60 * 24)
        );
      },
      (err) => {
        console.log(err);
      }
    );
  }

  onDeveloperSelected(event: Event) {
    const target = event.target as HTMLInputElement;
    const selectedDev = target.value;
    this.devService.getDevByName(selectedDev).subscribe(
      (data) => {
        this.dev = data as Developpeur;
        this.selectedDevMatr = this.dev.matrDev;
        console.log(this.selectedDevMatr);
      },
      (err) => {
        console.log(err);
      }
    );
  }
  onSubmit() {
    this.input = {
      id_ticket: Number(this.route.snapshot.paramMap.get('id')),
      matrDev: this.selectedDevMatr,
    };
    console.log(this.input.id_ticket);
    console.log(this.input.matrDev);
    if (!this.input.matrDev) {
      alert('Il faut choisir un développeur!');
    } else {
      this.adminService.reAssignTicket(this.input).subscribe((res) => {
        this.response = res;
        this.sendEmail();
        location.reload();
      });
      //this.router.navigate(['/admin']);
    }
  }
  sendEmail() {
    const recipient = this.dev.email;
    const subject = 'Un ticket vous a été affecté';
    const body = `Cher(e) ${this.dev.nom},
  
    J'espère que vous allez bien. Je vous informe que le ticket avec l'ID ${this.ticket.id_ticket} a été affecté à votre nom.
    Veuillez consulter le ticket et prendre en charge la résolution du problème dans les plus brefs délais. 
    Si vous avez des questions ou des préoccupations concernant ce ticket, n'hésitez pas à me contacter.
    Merci pour votre collaboration. 
    Cordialement,
    ${this.ticket.admin.nom}`;

    const emailUrl = `mailto:${recipient}?subject=${encodeURIComponent(
      subject
    )}&body=${encodeURIComponent(body)}`;
    window.open(emailUrl);
  }
}
