import { Component, OnInit, EventEmitter, Output, Input } from '@angular/core';

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

  @Input() id: number;
  @Input() editMode: boolean;
  sportForm: FormGroup;

  constructor(private route: ActivatedRoute,
              private sportService: SportService,
              private router: Router) {
  }

  ngOnInit() {
     this.initForm();
  }

  @Output()
  onAdd: EventEmitter<Sport> = new EventEmitter<Sport>();

  @Output()
  onUpdate: EventEmitter<Sport> = new EventEmitter<Sport>();


  onSubmit() {
    if (this.editMode) {
      this.sportForm.value._id = this.id;
      this.onUpdate.next(this.sportForm.value);
      this.sportService.updateSport(this.id, this.sportForm.value);
    } else {
      console.log(this.editMode);
      this.onAdd.next(this.sportForm.value);
      this.sportService.addSport(this.sportForm.value);
    }
    this.onCancel();
  }

  onCancel() {
    this.editMode = false;
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
