import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Developpeur } from '../entities/developpeur';
import { AdminService } from '../_services/admin.service';
import { UserService } from '../_services/user.service';

@Component({
  selector: 'app-update-dev',
  templateUrl: './update-dev.component.html',
  styleUrls: ['./update-dev.component.css'],
})
export class UpdateDevComponent implements OnInit {
  constructor(
    private route: ActivatedRoute,
    private adminService: AdminService,
    private router: Router,
    public userService: UserService
  ) {}
  dev!: Developpeur;
  ngOnInit() {
    const cuid = this.route.snapshot.paramMap.get('cuid');
    console.log('>>>>', cuid); // prints the value of the parameter
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
  goToManageUsers() {
    this.router.navigate(['/manageUsers']);
  }
  onUpdate() {
    let conf = confirm('Voulez vous vraiment effectuer cette modification?');
    if (
      !this.dev.nom ||
      !this.dev.prenom ||
      !this.dev.tele ||
      !this.dev.email ||
      !this.dev.matrDev ||
      !this.dev.username
    ) {
      alert('Veuillez remplir tous les champs!!');
    } else if (!/^[a-zA-Z]+$/.test(this.dev.nom)) {
      alert('Nom invalide. Ne utilisez pas les chiffres!');
    } else if (!/^[a-zA-Z]+$/.test(this.dev.prenom)) {
      alert('Prénom invalide. Ne utilisez pas les chiffres!');
    } else if (!/^[a-zA-Z0-9]+$/.test(this.dev.username)) {
      alert('Nom d utilisateur invalide');
    } else if (!/^\d{10}$/.test(this.dev.tele)) {
      alert('Numéro de téléphone invalide.');
    } else if (!/^[a-z0-9._%+-]+@sofrecom\.com$/i.test(this.dev.email)) {
      alert('Email invalide. Veuillez entrer un email @sofrecom.com');
    } else if (!/^[a-zA-Z0-9]{8}$/.test(this.dev.matrDev)) {
      alert('CUID invalide.Le cuid doit être au moins 8 caractères ');
    } else {
      if (conf) {
        this.adminService.updateDev(this.dev).subscribe(
          (data) => {
            console.log(data);
            this.goToManageUsers();
          },
          (err) => console.log(err)
        );
        const res = this.adminService.updateDev(this.dev);
      }
    }
  }
}
