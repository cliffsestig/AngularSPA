import { Component, OnInit } from '@angular/core';


import { ActivatedRoute, Params, Router } from '@angular/router';
import { FormGroup, FormControl, FormArray, Validators } from '@angular/forms';

import { SportService } from '../../../services/sport.service';

@Component({
  selector: 'app-registration-edit',
  templateUrl: './registration-edit.component.html',
  styleUrls: ['./registration-edit.component.css'],
  providers: [SportService]
})
export class RegistrationEditComponent implements OnInit {

  id: number;
  cid: number;
  rid: number;
  editMode = false;
  registrationForm: FormGroup;

  constructor(private route: ActivatedRoute,
              private sportService: SportService,
              private router: Router) {
  }

  ngOnInit() {
    this.route.parent.params
      .subscribe(
        (params: Params) => {
          this.id = params['id'];
          this.cid = params['cid'];
        }
      );
    this.route.params
      .subscribe(
        (params: Params) => {
          this.rid = params['rid'];
          this.editMode = params['rid'] != null;
          this.initForm();
        }
      );
  }

  onSubmit() {
    if (this.editMode) {
    	console.log(this.id, this.cid, this.rid);
      
      this.sportService.updateRegistration(this.id, this.cid, this.rid, this.registrationForm.value);
      this.onCancel();
    } else {
      this.sportService.addRegistration(this.registrationForm.value, this.id, this.cid);

    this.router.navigate(['../'], {relativeTo: this.route});
    }
  }

  onCancel() {
    this.router.navigate(['../../'], {relativeTo: this.route});
  }

  private initForm() {
    let registrationName = '';
    let registrationDescription = '';

    if (this.editMode) {
      const registration = this.sportService.getRegistration(this.id, this.cid).then(registration => {
      registrationName = registration.name;
      registrationDescription = registration.description;
    });
    }

    this.registrationForm = new FormGroup({
      'name': new FormControl(registrationName, Validators.required),
      'description': new FormControl(registrationDescription, Validators.required)
    });
  }
}
