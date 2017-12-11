import { Component, OnInit, EventEmitter, Output } from '@angular/core';

import { ActivatedRoute, Params, Router } from '@angular/router';
import { FormGroup, FormControl, FormArray, Validators } from '@angular/forms';

import { SportService } from '../../../services/sport.service';
import { Sport } from '../../../shared/sport.model';

@Component({
  selector: 'app-sport-edit',
  templateUrl: './sport-edit.component.html',
  styleUrls: ['./sport-edit.component.css'],
  providers: [SportService]
})
export class SportEditComponent implements OnInit {

  id: number;
  editMode = false;
  sportForm: FormGroup;

  constructor(private route: ActivatedRoute,
              private sportService: SportService,
              private router: Router) {
  }

  ngOnInit() {
    this.route.params
      .subscribe(
        (params: Params) => {
          this.id = params['id'];
          this.editMode = params['id'] != null;
          this.initForm();
        }
      );
  }

  @Output()
  onAdd: EventEmitter<Sport> = new EventEmitter<Sport>();

  onSubmit() {
    if (this.editMode) {
      console.log('testv2');
      this.sportService.updateSport(this.id, this.sportForm.value);
    } else {
      console.log('test');
      this.onAdd.next(this.sportForm.value);
      this.sportService.addSport(this.sportForm.value);
    }
    this.onCancel();
  }

  onCancel() {

    this.sportForm.reset();
    this.router.navigate(['../'], {relativeTo: this.route});
  }

  private initForm() {
    let sportName = '';
    let sportDescription = '';

    if (this.editMode) {
      const sport = this.sportService.getSport(this.id).then(sport => {
      sportName = sport.name;
      sportDescription = sport.description;
    });
    }

    this.sportForm = new FormGroup({
      'name': new FormControl(sportName, Validators.required),
      'description': new FormControl(sportDescription, Validators.required)
    });
  }

}
