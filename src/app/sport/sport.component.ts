import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { Sport } from '../../shared/sport.model';

import { SportService } from '../../services/sport.service';

@Component({
  selector: 'app-sport',
  templateUrl: './sport.component.html',
  styleUrls: ['./sport.component.css'],
  providers: [SportService]
})
export class SportComponent implements OnInit {

	sports: Sport[];

  	constructor(private sportService: SportService,
                private router: Router,
                private route: ActivatedRoute) { }

  	ngOnInit() {
  		this.sportService.getSports()
	      .then(sports => this.sports = sports)
	      .catch(error => console.log(error));
  	}

}
