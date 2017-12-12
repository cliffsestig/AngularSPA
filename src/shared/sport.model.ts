import { Club } from './club.model';

export class Sport {
  public _id: number;
  public name: string;
  public description: string;
  public clubs: Club[];

  constructor(name: string, desc: string, clubs: Club[]) {
    this.name = name;
    this.description = desc;
    this.clubs = clubs;
  }
}
