import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';

import { Sport } from '../../shared/sport.model';
import { SportService } from '../../services/sport.service';

@Component({
  selector: 'app-club',
  templateUrl: './club.component.html',
  styleUrls: ['./club.component.css'],
  providers: [SportService]
})
export class ClubComponent implements OnInit {

	sport: Sport;
  	constructor(private sportService: SportService,
              private route: ActivatedRoute,
              private router: Router) { }

	  ngOnInit() {
	  	this.route.params
	      .subscribe(
	        (params: Params) => {
	      this.sportService.getSport(params['id'])
	        .then(rec => this.sport = rec)
	        .catch(error => console.log(error));
	      }
	    );
	  }

	onNewClub() {
     this.router.navigate(['new'], {relativeTo: this.route});
  	}

 onDeleteClub(id: number, cid: number) {
    this.sportService.deleteClub(id, cid);
  }
}
