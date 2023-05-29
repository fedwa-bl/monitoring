import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { data } from 'jquery';
import { Observable, switchMap } from 'rxjs';
import { Ticket } from '../entities/Ticket';
import { AdminService } from '../_services/admin.service';
import { DevService } from '../_services/dev.service';
import { TicketService } from '../_services/ticket.service';
import { UserService } from '../_services/user.service';
import { forkJoin } from 'rxjs';
import Swal from 'sweetalert2';
import { Location } from '@angular/common';

@Component({
  selector: 'app-update-ticket',
  templateUrl: './update-ticket.component.html',
  styleUrls: ['./update-ticket.component.css']
})
export class UpdateTicketComponent implements OnInit{

  statuses: string[] = [];
  ticket!: Ticket;
  idTick!: number;
  input: any;
  status!: string;
  comment!: string;
  timer: any;
  interval!: any;

  constructor(
    public userService: UserService,
    private ticketService: TicketService,
    private devService: DevService,
    private route: ActivatedRoute,
    private router: Router,
    private location: Location
  ) {}

  ngOnInit(): void {
    this.status="";
    this.comment="";
    const id = Number(this.route.snapshot.paramMap.get('id'));
    this.onGetId(id);
    this.ticketService.getStatuses().subscribe(statuses => {
      this.statuses = statuses;
    });
  }

  onGetId(id: number) {
    this.ticketService.getTicketById(id).subscribe(
      (data) => {
        this.ticket = data as Ticket;
      },
      (err) => {
        console.log(err);
      }
    );
  }

  onStatusChange(){
    console.log('Selected status:', this.status);
  }

  /*modifierStatus() {
    const id = Number(this.route.snapshot.paramMap.get('id'));
    this.onGetId(id);
    const options = { headers: { 'Content-Type': 'application/json' } };
      this.devService.updateStatus(id, this.status).subscribe((response) => {
        console.log('Response from backend:', response);
      }, (error) => {
        console.error('Error from backend:', error);
        // rest of your code
      });
  }

  addComment() {
    const id = Number(this.route.snapshot.paramMap.get('id'));
    this.onGetId(id);
    // Update ticket object with new comment
    //this.ticket.commentaire = this.comment;
      this.devService.ajouterCommentaire(id, this.comment).subscribe(
        response => {
          console.log(response);
        },
        error => {
          console.log(error);
          // Handle the error
        }
      );
  }*/

  updateTicket() {
    const id = Number(this.route.snapshot.paramMap.get('id'));
    this.onGetId(id);
    const options = { headers: { 'Content-Type': 'application/json' } };

    // Check if the current status is already 'EN_COURS'
    if (this.ticket.status === 'EN_COURS' && this.status === 'EN_COURS') {
      //alert("");
      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: 'Vous ne pouvez pas mettre à jour le statut sur "EN_COURS" à nouveau!'
      })
      return;
    }else if(this.ticket.status === 'ANNULÉ' && this.status === 'EN_COURS'){
      //alert("!");
      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: 'Vous ne pouvez pas mettre à jour le statut sur "EN_COURS" après l\'avoir mis à jour sur ANNULE!'
      })
    }else if(this.ticket.status === 'RÉSOLU' && this.status === 'EN_COURS'){
      //alert("!");
      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: 'Vous ne pouvez pas mettre à jour le statut sur "EN_COURS" après l\'avoir mis à jour sur RÉSOLU!'
      })
    }else if(this.ticket.status === 'EN_COURS' && this.status === 'OUVERT'){
      //alert("!");
      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: 'Vous ne pouvez pas mettre à jour le statut sur "OUVERT" après l\'avoir mis à jour sur EN_COURS!'
      })
    }
    else if(this.ticket.status === 'ANNULÉ' && this.status === 'OUVERT'){
      //alert("!");
      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: 'Vous ne pouvez pas mettre à jour le statut sur "OUVERT" après l\'avoir mis à jour sur ANNULÉ!'
      })
    }
    else if(this.ticket.status === 'RÉSOLU' && this.status === 'OUVERT'){
      //alert("!");
      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: 'Vous ne pouvez pas mettre à jour le statut sur "OUVERT" après l\'avoir mis à jour sur RÉSOLU!'
      })
    }else if(this.ticket.status === 'RÉSOLU' && this.status === 'RÉSOLU'){
      //alert("!");
      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: 'Vous ne pouvez pas mettre à jour le statut sur "RÉSOLU" à nouveau!'
      })
    }else if(this.ticket.status === 'ANNULÉ' && this.status === 'ANNULÉ'){
      //alert("!");
      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: 'Vous ne pouvez pas mettre à jour le statut sur "ANNULÉ" à nouveau!'
      })
    }
    else{
      let updatedComment = this.comment;
      this.devService.updateTicket(id, this.status, this.comment).subscribe((response) => {
        console.log('Response from backend:', response);
      }, (error) => {
        console.error('Error from backend:', error);
      });
      //alert
      Swal.fire({
        position: 'center',
        icon: 'success',
        title: 'Ticket bien modifié',
        showConfirmButton: false,
        timer: 1500
      });
    }
    
  }
  

  /*onSubmit() {
    const id = Number(this.route.snapshot.paramMap.get('id'));
    const addComment$ = this.devService.ajouterCommentaire(id, this.comment);
    const updateStatus$ = this.devService.updateStatus(id, this.status);

    forkJoin([addComment$, updateStatus$]).subscribe(
      (responses) => {
        console.log('Responses from backend:', responses);
        alert('Ticket bien modifié');
        this.router.navigate(['/developer']);
      },
      (error) => {
        console.error('Error from backend:', error);
        // Handle the error
      }
    );
  }*/

  
  onSubmit() {
    this.updateTicket();
    //navigate to previous page
    this.location.back();
  }

}
