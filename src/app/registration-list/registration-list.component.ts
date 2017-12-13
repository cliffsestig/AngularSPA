import { Component, OnInit } from '@angular/core';

import { RegistrationService } from '../../services/registration.service';

import { Registration } from '../../shared/registration.model';

@Component({
  selector: 'app-registration-list',
  templateUrl: './registration-list.component.html',
  styleUrls: ['./registration-list.component.css'],
  providers: [RegistrationService]
})
export class RegistrationListComponent implements OnInit {

  registrations: Registration[];

  constructor(private registrationService: RegistrationService) { }

  ngOnInit() {
  	this.registrationService.getRegistrations()
	  .then(registrations => this.registrations = registrations)
	  .catch(error => console.log(error));
  }

}
