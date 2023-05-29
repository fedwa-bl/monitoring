import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';
import { Developpeur } from '../entities/developpeur';
import { AdminService } from '../_services/admin.service';
import { UserService } from '../_services/user.service';

@Component({
  selector: 'app-create-dev',
  templateUrl: './create-dev.component.html',
  styleUrls: ['./create-dev.component.css'],
})
export class CreateDevComponent implements OnInit {
  constructor(
    private adminService: AdminService,
    private router: Router,
    public userService: UserService
  ) {}
  ngOnInit(): void {}
  dev: Developpeur = new Developpeur();
  nomErrorMessage!: string;
  prenomErrorMessage!: string;
  usernameErrorMessage!: string;
  teleErrorMessage!: string;
  emailErrorMessage!: string;
  cuidErrorMessage!: string;
  passwordErrorMessage!: string;
  saveAccount() {
    this.adminService.createAccount(this.dev).subscribe(
      (data) => {
        console.log(data);
        this.goToManageUsers();
      },
      (err) => {
        console.log(err);
        if (err.status === 403) {
          alert(
            'Le développeur avec le cuid ' + this.dev.matrDev + ' existe déja!'
          );
        }
      }
    );
  }
  goToManageUsers() {
    this.router.navigate(['/manageUsers']);
  }

  onSubmit() {
    if (
      !this.dev.nom ||
      !this.dev.prenom ||
      !this.dev.tele ||
      !this.dev.email ||
      !this.dev.matrDev ||
      !this.dev.password ||
      !this.dev.username
    ) {
      alert('Veuillez remplir tous les champs!!');
    } else if (!/^[a-zA-Z]+$/.test(this.dev.nom)) {
      alert('Nom invalide. Ne utilisez pas les chiffres!');
    } else if (!/^[a-zA-Z]+$/.test(this.dev.prenom)) {
      alert('Prénom invalide. Ne utilisez pas les chiffres!');
    } else if (!/^[a-zA-Z0-9]+$/.test(this.dev.username)) {
      alert('Nom d utilisateur invalide');
    } /*else if (this.dev.username.length < 8) {
      alert(
        "Nom d'utilisateur trop court! Il doit être au moins 8 caractères "
      );
    }*/ else if (!/^\d{10}$/.test(this.dev.tele)) {
      alert('Numéro de téléphone invalide.');
    } else if (!/^[a-z0-9._%+-]+@sofrecom\.com$/i.test(this.dev.email)) {
      alert('Email invalide. Veuillez entrer un email @sofrecom.com');
    } else if (!/^[a-zA-Z0-9]{8}$/.test(this.dev.matrDev)) {
      alert('CUID invalide.Le cuid doit être au moins 8 caractères ');
    } else if (!/^[a-zA-Z0-9]+$/.test(this.dev.password)) {
      alert('Mot de passe invalide.');
    } else if (this.dev.password.length < 8) {
      alert(
        'Mot de passe invalide.Mot de passe doit être au moins 8 caractères'
      );
    } else {
      Swal.fire({
        position: 'center',
        icon: 'success',
        title: 'Compte crée',
        showConfirmButton: false,
        timer: 1500,
      });
      this.saveAccount();
    }
  }
}
