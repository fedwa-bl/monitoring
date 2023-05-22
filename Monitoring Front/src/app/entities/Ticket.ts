import { Admin } from './admin';
import { Application } from './application';
import { Client } from './client';
import { Developpeur } from './developpeur';

export class Ticket {
  id_ticket!: number;
  description!: string;
  status!: string;
  criticite!: string;
  date_creation!: Date;
  date_fin!: Date;
  application!: Application;
  developpeur!: Developpeur;
  admin!: Admin;
  client!: Client;
  durée!: number;
}
