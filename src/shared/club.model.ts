import { Registration } from './registration.model';

export class Club {
  public _id: number;
  public name: string;
  public description: string;
  public registrations: Registration[];

  constructor(name: string, desc: string, registrations: Registration[]) {
    this.name = name;
    this.description = desc;
    this.registrations = registrations;
  }
}
