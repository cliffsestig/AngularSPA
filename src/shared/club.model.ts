import { Registration } from './registration.model';

export class Club {
  public _id: number;
  public name: string;
  public city: string;
  public address: string;
  public zipcode: string;
  public description: string;
  public registrations: Registration[];

  constructor(name: string, desc: string, city: string, address: string, zipcode: string, registrations: Registration[]) {
    this.name = name;
    this.description = desc;
    this.city = city;
    this.address = address;
    this.zipcode = zipcode;
    this.registrations = registrations;
  }
}
