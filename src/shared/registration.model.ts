export class Registration {
  public _id: number;
  public name: string;
  public description: string;

  constructor(name: string, desc: string) {
    this.name = name;
    this.description = desc;
  }
}
