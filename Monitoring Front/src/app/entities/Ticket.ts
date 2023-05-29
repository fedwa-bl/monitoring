import { Admin } from './admin';
import { Application } from './application';
import { Developpeur } from './developpeur';

export class Ticket {
  id_ticket!: number;
  description!: string;
  commentaire!: string;
  status!: string;
  criticite!: string;
  date_creation!: Date;
  date_fin!: Date;
  application!: Application;
  developpeur!: Developpeur;
  admin!: Admin;
  timer!: number;
  duration!: string;
  durée!: number;
  date_resolution!: Date;
}
