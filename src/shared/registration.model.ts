export class Registration {
  public _id: number;
  public firstname: string;
  public lastname: string;
  public age: number;
  public gender: string;

  constructor(firstname: string, lastname: string, age: number, gender: string, desc: string) {
    this.firstname = firstname;
    this.lastname = lastname;
    this.age = age;
    this.gender = gender;
  }
}
