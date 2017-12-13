import { Component, OnInit } from '@angular/core';

import { ClubService } from '../../services/club.service';

import { Club } from '../../shared/club.model';

@Component({
  selector: 'app-club-list',
  templateUrl: './club-list.component.html',
  styleUrls: ['./club-list.component.css'],
  providers: [ClubService]
})
export class ClubListComponent implements OnInit {

  clubs: Club[];

  constructor(private clubService: ClubService) { }

  ngOnInit() {
  	this.clubService.getClubs()
	  .then(clubs => this.clubs = clubs)
	  .catch(error => console.log(error));

	  console.log(this.clubs);
  }

}
