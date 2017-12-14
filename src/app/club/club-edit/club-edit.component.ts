import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

import { ActivatedRoute, Params, Router } from '@angular/router';
import { FormGroup, FormControl, FormArray, Validators } from '@angular/forms';

import { SportService } from '../../../services/sport.service';

import { Sport } from '../../../shared/sport.model';

@Component({
  selector: 'app-club-edit',
  templateUrl: './club-edit.component.html',
  styleUrls: ['./club-edit.component.css'],
  providers: [SportService]
})
export class ClubEditComponent implements OnInit {

  @Input() id: number;
  @Input() cid: number;
  @Input() editMode = false;
  clubForm: FormGroup;

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
      this.clubForm.value._id = this.cid;
      this.onUpdate.next(this.clubForm.value);
      this.sportService.updateClub(this.id, this.cid, this.clubForm.value);
    } else {

      this.sportService.addClub(this.clubForm.value, this.id).then(club => {
        this.onAdd.next(club);
      });
    }
    this.onCancel();
  }

  onCancel() {
    this.editMode = false;
    this.clubForm.reset();
    this.router.navigate(['./'], {relativeTo: this.route});
  }

  private initForm() {
    let clubName = '';
    let clubCity = '';
    let clubAddress = '';
    let clubZipcode = '';
    let clubDescription = '';

    if (this.editMode) {
      const club = this.sportService.getClub(this.id, this.cid).then(club => {
      clubName = club.name;
      clubCity = club.city;
      clubAddress = club.address;
      clubZipcode = club.zipcode;
      clubDescription = club.description;
    });
    }

    this.clubForm = new FormGroup({
      'name': new FormControl(clubName, Validators.required),
      'city': new FormControl(clubCity, Validators.required),
      'address': new FormControl(clubAddress, Validators.required),
      'zipcode': new FormControl(clubZipcode, Validators.required),
      'description': new FormControl(clubDescription, Validators.required),
    });
  }
}
