import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Developpeur } from '../entities/developpeur';
import { Ticket } from '../entities/Ticket';
import { AdminService } from '../_services/admin.service';
import { DevService } from '../_services/dev.service';
import { UserService } from '../_services/user.service';

@Component({
  selector: 'app-assign-tickets',
  templateUrl: './assign-tickets.component.html',
  styleUrls: ['./assign-tickets.component.css'],
})
export class AssignTicketsComponent implements OnInit {
  ticket!: Ticket;
  devs!: any;
  dev!: Developpeur;
  id_ticket!: number;
  selectedDevMatr = '';
  input: any;

  response: any;

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private adminService: AdminService,
    private devService: DevService,
    public userService: UserService
  ) {}

  ngOnInit(): void {
    const id = Number(this.route.snapshot.paramMap.get('id'));
    this.onGetId(id);
    this.onGetActiveDevs();
  }

  onGetId(id: number) {
    this.adminService.getTicketById(id).subscribe(
      (data) => {
        this.ticket = data as Ticket;
      },
      (err) => {
        console.log(err);
      }
    );
  }
  onGetActiveDevs() {
    this.devService.getActiveDevs().subscribe(
      (data) => {
        this.devs = data as Developpeur;
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
      this.adminService.assignTicket(this.input).subscribe((res) => {
        this.response = res;
        this.sendEmail();
        location.reload();
      });
      this.router.navigate(['/admin']);
    }
  }
  sendEmail() {
    const recipient = this.dev.email;
    const subject = 'Un ticket vous a été affecté';
    const body = `Cher(e) ${this.dev.nom},

    J'espère que vous allez bien. Je vous informe que le ticket ${this.ticket.id_ticket} a été affecté à 
    votre nom.
    Veuillez consulter le ticket et prendre en charge la résolution du problème dans les plus brefs délais. 
    Si vous avez des questions ou des préoccupations concernant ce ticket, n'hésitez pas à me contacter.
    Merci pour votre collaboration. 
    Cordialement,
    ${this.ticket.admin.nom}`;
    const sender = this.ticket.admin.email;
    //const sender = 'fadwa.boulekhras@sofrecom.com';

    const emailUrl = `mailto:${recipient}?subject=${subject}&body=${body}&from=${sender}&url=mailto:
                             ${recipient}&entry=0`;
    window.location.href = emailUrl;
  }
}
