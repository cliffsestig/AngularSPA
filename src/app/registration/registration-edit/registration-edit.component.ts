import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';


import { ActivatedRoute, Params, Router } from '@angular/router';
import { FormGroup, FormControl, FormArray, Validators } from '@angular/forms';

import { SportService } from '../../../services/sport.service';

import { Club } from '../../../shared/club.model';

@Component({
  selector: 'app-registration-edit',
  templateUrl: './registration-edit.component.html',
  styleUrls: ['./registration-edit.component.css'],
  providers: [SportService]
})
export class RegistrationEditComponent implements OnInit {

  @Input() id: number;
  @Input() cid: number;
  @Input() rid: number;
  @Input() editMode = false;
  registrationForm: FormGroup;

  constructor(private route: ActivatedRoute,
              private sportService: SportService,
              private router: Router) {
  }

  ngOnInit() {
    this.initForm();
  }

  @Output()
  onAdd: EventEmitter<Club> = new EventEmitter<Club>();

  @Output()
  onUpdate: EventEmitter<Club> = new EventEmitter<Club>();

 onSubmit() {
    if (this.editMode) {
      console.log(this.id, this.cid, this.rid);
      this.registrationForm.value._id = this.rid;
      this.onUpdate.next(this.registrationForm.value);
      this.sportService.updateRegistration(this.id, this.cid, this.rid, this.registrationForm.value);
    } else {
      this.onAdd.next(this.registrationForm.value);
      this.sportService.addRegistration(this.registrationForm.value, this.id, this.cid);
    }
    this.onCancel();
  }

  onCancel() {
    this.editMode = false;
    this.rid = null;
    this.registrationForm.reset();
    this.router.navigate(['../'], {relativeTo: this.route});
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
