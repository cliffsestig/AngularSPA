import { Component, OnInit } from '@angular/core';

import { ActivatedRoute, Params, Router } from '@angular/router';
import { FormGroup, FormControl, FormArray, Validators } from '@angular/forms';

import { SportService } from '../../../services/sport.service';

@Component({
  selector: 'app-club-edit',
  templateUrl: './club-edit.component.html',
  styleUrls: ['./club-edit.component.css'],
  providers: [SportService]
})
export class ClubEditComponent implements OnInit {

  id: number;
  cid: number;
  editMode = false;
  clubForm: FormGroup;

  constructor(private route: ActivatedRoute,
              private sportService: SportService,
              private router: Router) {
  }

  ngOnInit() {
    this.route.parent.params
      .subscribe(
        (params: Params) => {
          this.id = params['id'];
        }
      );
    this.route.params
      .subscribe(
        (params: Params) => {
          this.cid = params['cid'];
          this.editMode = params['cid'] != null;
          this.initForm();
        }
      );
  }

  onSubmit() {
    if (this.editMode) {
      this.sportService.updateClub(this.id, this.cid, this.clubForm.value);
      this.onCancel();
    } else {
      console.log(this.id, this.cid);
      this.sportService.addClub(this.clubForm.value, this.id);

    this.router.navigate(['../'], {relativeTo: this.route});
    }
  }

  onCancel() {
    this.router.navigate(['../../'], {relativeTo: this.route});
  }

  private initForm() {
    let clubName = '';
    let clubDescription = '';

    if (this.editMode) {
      const club = this.sportService.getClub(this.id, this.cid).then(club => {
      clubName = club.name;
      clubDescription = club.description;
    });
    }

    this.clubForm = new FormGroup({
      'name': new FormControl(clubName, Validators.required),
      'description': new FormControl(clubDescription, Validators.required)
    });
  }
}
